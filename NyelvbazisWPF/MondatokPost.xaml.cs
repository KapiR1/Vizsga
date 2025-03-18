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

namespace NyelvbazisWPF
{
    /// <summary>
    /// Interaction logic for MondatokPost.xaml
    /// </summary>
    public partial class MondatokPost : Window
    {
        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5271/") };

        public MondatokPost()
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

        private async Task PostMondatok()
        {
            try
            {
                string uId = Properties.Settings.Default["Token"].ToString();
                string magyarMondat = Uri.EscapeDataString(tbMagyarMondat.Text.Trim());
                string spanyolMondat = Uri.EscapeDataString(tbSpanyolMondat.Text.Trim());

                string requestUrl = $"api/Mondatok/{uId}?magyarMondat={magyarMondat}&spanyolMondat={spanyolMondat}";

                var response = await _httpClient.PostAsync(requestUrl, null);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Mondat sikeresen hozzáadva!");
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

        private async void AddButton_Click(object sender, RoutedEventArgs e)
        {
            if (tbMagyarMondat.Text != "" && tbSpanyolMondat.Text != "")
            {
                await PostMondatok();
            }
            else
            {
                MessageBox.Show("Mindkét mezőt ki kell tölteni!");
            }
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            OperationWindow operationWindow = new OperationWindow(Properties.Settings.Default["Name"].ToString(), Properties.Settings.Default["Email"].ToString());
            operationWindow.Show();
            this.Close();
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadMondatok();
        }
    }
}
