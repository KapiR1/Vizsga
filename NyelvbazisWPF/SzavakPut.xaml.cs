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
    /// Interaction logic for SzavakPut.xaml
    /// </summary>
    public partial class SzavakPut : Window
    {
        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5271/") };
        public SzavakPut()
        {
            InitializeComponent();
        }
        public class SzavakSpanyol
        {
            public int Id { get; set; }
            public string SpanyolSzo { get; set; }
            public SzavakMagyar IdNavigation { get; set; }
        }

        public class SzavakMagyar
        {
            public int Id { get; set; }
            public string MagyarSzo { get; set; }
            public SzavakSpanyol IdNavigation { get; set; }
        }
        public class SzavakViewModel
        {
            public int Id { get; set; }
            public string MagyarSzo { get; set; }
            public string SpanyolSzo { get; set; }
        }
        private async Task LoadSzavak()
        {
            try
            {
                var responseHungarian = await _httpClient.GetAsync("api/Szavak/GetAllHungarian");
                var responseSpanish = await _httpClient.GetAsync("api/Szavak/GetAllSpanish");

                if (responseHungarian.IsSuccessStatusCode && responseSpanish.IsSuccessStatusCode)
                {
                    var hungarianWords = JsonConvert.DeserializeObject<List<SzavakMagyar>>(await responseHungarian.Content.ReadAsStringAsync());
                    var spanishWords = JsonConvert.DeserializeObject<List<SzavakSpanyol>>(await responseSpanish.Content.ReadAsStringAsync());

                    DataTable dt = new DataTable();
                    dt.Columns.Add("Id", typeof(int));
                    dt.Columns.Add("MagyarSzo", typeof(string));
                    dt.Columns.Add("SpanyolSzo", typeof(string));

                    foreach (var hungarianWord in hungarianWords)
                    {
                        var matchingSpanish = spanishWords.Find(s => s.Id == hungarianWord.Id);
                        dt.Rows.Add(hungarianWord.Id, hungarianWord.MagyarSzo, matchingSpanish?.SpanyolSzo ?? "üres");
                    }

                    dtgUsers.ItemsSource = dt.DefaultView;
                }
                else
                {
                    MessageBox.Show("Nem sikerült a szavak betöltése.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }

        private async Task PutSzavak()
        {
            try
            {
                string uId = Properties.Settings.Default["Token"].ToString();
                string Id = Uri.EscapeDataString(tbId.Text);
                string magyarSzo = Uri.EscapeDataString(tbMagyarSzo.Text.Trim());
                string spanyolSzo = Uri.EscapeDataString(tbSpanyolSzo.Text.Trim());

                string requestUrl = $"api/Szavak/{uId}?szoId={Id}&ujMagyarSzo={magyarSzo}&ujSpanyolSzo={spanyolSzo}";

                var response = await _httpClient.PutAsync(requestUrl, null);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Szó sikeresen módosítva!");
                    tbId.Text = "";
                    tbMagyarSzo.Text = "";
                    tbSpanyolSzo.Text = "";
                    await LoadSzavak();
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

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            OperationWindow operationWindow = new OperationWindow(Properties.Settings.Default["Name"].ToString(), Properties.Settings.Default["Email"].ToString());
            operationWindow.Show();
            this.Close();
        }

        private async void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            if (tbId.Text != "" && tbMagyarSzo.Text != "" && tbSpanyolSzo.Text != "")
            {
                await PutSzavak();
            }
            else
            {
                MessageBox.Show("Mindkét mezőt ki kell tölteni!");
            }
        }

        private void dtgUsers_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (dtgUsers.SelectedItem is DataRowView selectedRow)
            {
                var id = selectedRow["Id"];
                var magyarSzo = selectedRow["MagyarSzo"];
                var spanyolSzo = selectedRow["SpanyolSzo"];

                tbId.Text = id.ToString();
                tbMagyarSzo.Text = magyarSzo.ToString();
                tbSpanyolSzo.Text = spanyolSzo.ToString();
            }
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadSzavak();
        }
    }
}
