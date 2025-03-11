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
    /// Interaction logic for SzavakPost.xaml
    /// </summary>
    public partial class SzavakPost : Window
    {
        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5271/") };

        public SzavakPost()
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

        private async Task PostSzavak()
        {
            try
            {
                string uId = Properties.Settings.Default["Token"].ToString();
                string magyarSzo = Uri.EscapeDataString(tbMagyarSzo.Text.Trim());
                string spanyolSzo = Uri.EscapeDataString(tbSpanyolSzo.Text.Trim());

                string requestUrl = $"api/Szavak/{uId}?magyarSzo={magyarSzo}&spanyolSzo={spanyolSzo}";

                var response = await _httpClient.PostAsync(requestUrl, null);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Szó sikeresen hozzáadva!");
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

        private async void AddButton_Click(object sender, RoutedEventArgs e)
        {
            if (tbMagyarSzo.Text != "" && tbSpanyolSzo.Text != "")
            {
                await PostSzavak();
            }
            else
            {
                MessageBox.Show("Mindkét mezőt ki kell tölteni!");
            }
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadSzavak();
        }
    }
}