using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.Data;
using System.Security.Policy;
using System.Xml.Linq;

namespace NyelvbazisWPF
{
    /// <summary>
    /// Interaction logic for MondatokPut.xaml
    /// </summary>
    public partial class MondatokPut : Window
    {
        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5271/") };

        public MondatokPut()
        {
            InitializeComponent();
        }
        public class MondatokSpanyol
        {
            public int Id { get; set; }
            public string SpanyolMondatok { get; set; }
            public MondatokMagyar IdNavigation { get; set; }
        }

        public class MondatokMagyar
        {
            public int Id { get; set; }
            public string MagyarMondatok { get; set; }
            public MondatokSpanyol IdNavigation { get; set; }
        }
        public class MondatokkViewModel
        {
            public int Id { get; set; }
            public string MagyarMondatok { get; set; }
            public string SpanyolMondatok { get; set; }
        }
        private async Task LoadMondatok()
        {
            try
            {
                var responseHungarian = await _httpClient.GetAsync("api/Mondatok/GetAllHungarian");
                var responseSpanish = await _httpClient.GetAsync("api/Mondatok/GetAllSpanish");

                if (responseHungarian.IsSuccessStatusCode && responseSpanish.IsSuccessStatusCode)
                {
                    var hungarianWords = JsonConvert.DeserializeObject<List<MondatokMagyar>>(await responseHungarian.Content.ReadAsStringAsync());
                    var spanishWords = JsonConvert.DeserializeObject<List<MondatokSpanyol>>(await responseSpanish.Content.ReadAsStringAsync());

                    DataTable dt = new DataTable();
                    dt.Columns.Add("Id", typeof(int));
                    dt.Columns.Add("MagyarMondat", typeof(string));
                    dt.Columns.Add("SpanyolMondat", typeof(string));

                    foreach (var hungarianWord in hungarianWords)
                    {
                        var matchingSpanish = spanishWords.Find(s => s.Id == hungarianWord.Id);
                        dt.Rows.Add(hungarianWord.Id, hungarianWord.MagyarMondatok, matchingSpanish?.SpanyolMondatok ?? "üres");
                    }

                    dtgUsers.ItemsSource = dt.DefaultView;
                }
                else
                {
                    MessageBox.Show("Nem sikerült a mondatok betöltése.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }

        private async Task PutMondatok()
        {
            try
            {
                string uId = Properties.Settings.Default["Token"].ToString();
                string Id = Uri.EscapeDataString(tbId.Text);
                string magyarSzo = Uri.EscapeDataString(tbMagyarMondat.Text.Trim());
                string spanyolSzo = Uri.EscapeDataString(tbSpanyolMondat.Text.Trim());

                string requestUrl = $"api/Mondatok/{uId}?mondatId={Id}&ujMagyarMondat={magyarSzo}&ujSpanyolMondat={spanyolSzo}";

                var response = await _httpClient.PutAsync(requestUrl, null);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Mondat sikeresen módosítva!");
                    tbId.Text = "";
                    tbMagyarMondat.Text = "";
                    tbSpanyolMondat.Text = "";
                    await LoadMondatok();
                }
                else
                {
                    MessageBox.Show($"Hiba történt: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }

        private async void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            if (tbId.Text != "" && tbMagyarMondat.Text != "" && tbSpanyolMondat.Text != "")
            {
                await PutMondatok();
            }
            else
            {
                MessageBox.Show("Mindhárom mezőt ki kell tölteni!");
            }
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            OperationWindow operationWindow = new OperationWindow(Properties.Settings.Default["Name"].ToString(), Properties.Settings.Default["Email"].ToString());
            operationWindow.Show();
            this.Close();
        }

        private void dtgUsers_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (dtgUsers.SelectedItem is DataRowView selectedRow)
            {
                var id = selectedRow["Id"];
                var magyarMondat = selectedRow["MagyarMondat"];
                var spanyolMondat = selectedRow["SpanyolMondat"];

                tbId.Text = id.ToString();
                tbMagyarMondat.Text = magyarMondat.ToString();
                tbSpanyolMondat.Text = spanyolMondat.ToString();
            }
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadMondatok();
        }
    }
}
