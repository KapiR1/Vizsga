using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace NyelvbazisWPF
{
    public partial class MainWindow : Window
    {
        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5271/") };

        public MainWindow()
        {
            InitializeComponent();
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text.Trim();
            string password = PasswordBox.Password.Trim();

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Felhasználónév és jelszó megadása kötelező!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                HttpResponseMessage saltResponse = await _httpClient.PostAsync($"api/Login/GetSalt/{username}", null);
                if (!saltResponse.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikertelen bejelentkezés, ellenőrizze adatait!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string salt = await saltResponse.Content.ReadAsStringAsync();
                string hashedPassword = ComputeSha256Hash(password + salt);

                var loginDTO = new
                {
                    LoginName = username,
                    TmpHash = hashedPassword
                };

                string jsonContent = JsonConvert.SerializeObject(loginDTO);
                var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                HttpResponseMessage loginResponse = await _httpClient.PostAsync("api/Login", httpContent);

                if (!loginResponse.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikertelen bejelentkezés, ellenőrizze adatait!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string responseBody = await loginResponse.Content.ReadAsStringAsync();
                var loginData = JsonConvert.DeserializeObject<LoginResponse>(responseBody);

                if (loginData != null)
                {
                    Properties.Settings.Default["Token"] = loginData.Token;
                    Properties.Settings.Default["Name"] = loginData.Nev;
                    Properties.Settings.Default["Email"] = loginData.Email;
                    Properties.Settings.Default.Save();

                    OperationWindow operationWindow = new OperationWindow(username);
                    operationWindow.Show();
                    this.Close();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private static string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }

        private void ExitButton_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }
    }

    public class LoginResponse
    {
        public string Token { get; set; }
        public string Nev { get; set; }
        public string Email { get; set; }
    }
}