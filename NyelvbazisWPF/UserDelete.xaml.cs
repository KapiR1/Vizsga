using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Collections.ObjectModel;
using System.Collections.Generic;

namespace NyelvbazisWPF
{
    /// <summary>
    /// Interaction logic for UserDelete.xaml
    /// </summary>
    public partial class UserDelete : Window
    {
        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5271/") };

        public UserDelete()
        {
            InitializeComponent();
        }

        public class JogosultsagNavigation
        {
            public int Id { get; set; }
            public int Szint { get; set; }
            public string Nev { get; set; }
            public string Leiras { get; set; }
        }

        public class User
        {
            public int Id { get; set; }
            public string Nev { get; set; }
            public string Email { get; set; }
            public string Salt { get; set; }
            public string Hash { get; set; }
            public int Pontszam { get; set; }
            public int Jogosultsag { get; set; }
            public int Aktiv { get; set; }
            public JogosultsagNavigation JogosultsagNavigation { get; set; }
        }
        private async Task LoadUsers()
        {
            try
            {
                var response = await _httpClient.GetAsync($"api/User?uId={Properties.Settings.Default["Token"]}");

                if (response.IsSuccessStatusCode)
                {
                    var users = JsonConvert.DeserializeObject<List<User>>(await response.Content.ReadAsStringAsync());
                    dtgUsers.ItemsSource = new ObservableCollection<User>(users);
                }
                else
                {
                    MessageBox.Show("Nem sikerült a felhasználók betöltése.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }
        private async void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if(tbId.Text != "")
            try
            {
                var response = await _httpClient.DeleteAsync($"api/User/{Properties.Settings.Default["Token"]}/{tbId.Text}?torlendoId={tbId.Text}");

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Felhasználó sikeresen törölve!");
                    tbId.Text = "";
                    await LoadUsers();
                }
                else
                {
                    MessageBox.Show("Hiba történt: " + response.StatusCode);
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

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadUsers();
        }
    }
}
