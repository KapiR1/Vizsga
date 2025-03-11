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
    /// Interaction logic for UserPut.xaml
    /// </summary>
    public partial class UserPut : Window
    {
        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5271/") };

        public UserPut()
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

        private async Task PutUser(User newUser)
        {
            try
            {
                string jsonContent = JsonConvert.SerializeObject(newUser);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                var response = await _httpClient.PutAsync($"api/User/{Properties.Settings.Default["Token"]}", content);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Felhasználó sikeresen módosítva!");
                    tbId.Text = "";
                    tbName.Text = "";
                    tbEmail.Text = "";
                    tbSalt.Text = "";
                    tbHash.Text = "";
                    tbPontszam.Text = "";
                    tbJogosultsag.Text = "";
                    cbAktiv.IsChecked = false;
                    dtgUsers.SelectedCells.Clear();
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

        private void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            if (tbId.Text != "" && tbName.Text != "" && tbEmail.Text != "" && tbSalt.Text != "" && tbHash.Text != "" && tbPontszam.Text != "" && tbJogosultsag.Text != "")
            {
                try
                {
                    var newUser = new User
                    {
                        Id = Convert.ToInt32(tbId.Text),
                        Nev = tbName.Text.ToString(),
                        Email = tbEmail.Text.ToString(),
                        Salt = tbSalt.Text.ToString(),
                        Hash = tbHash.Text.ToString(),
                        Pontszam = Convert.ToInt32(tbPontszam.Text),
                        Jogosultsag = Convert.ToInt32(tbJogosultsag.Text),
                        Aktiv = (bool)cbAktiv.IsChecked ? 1 : 0,
                        JogosultsagNavigation = null
                    };
                    PutUser(newUser);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba történt: {ex.Message}");
                }
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

        private void dtgUsers_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (dtgUsers.SelectedItem is User selectedUser)
            {
                tbId.Text = selectedUser.Id.ToString();
                tbName.Text = selectedUser.Nev;
                tbEmail.Text = selectedUser.Email;
                tbSalt.Text = selectedUser.Salt;
                tbHash.Text = selectedUser.Hash;
                tbPontszam.Text = selectedUser.Pontszam.ToString();
                tbJogosultsag.Text = selectedUser.Jogosultsag.ToString();
                cbAktiv.IsChecked = selectedUser.Aktiv == 1;
            }
        }
    }
}
