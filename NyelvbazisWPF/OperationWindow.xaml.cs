using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace NyelvbazisWPF
{
    /// <summary>
    /// Interaction logic for OperationWindow.xaml
    /// </summary>
    public partial class OperationWindow : Window
    {
        public OperationWindow(string username, string email)
        {
            InitializeComponent();
            LoggedInUserTextBlock.Text = username;
            EmailTextBlock.Text = email;
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            MainWindow loginWindow = new MainWindow();
            loginWindow.Show();
            this.Close();
        }

        private void AddSentence_Click(object sender, RoutedEventArgs e)
        {
            // Implement add sentence logic
        }

        private void AddUser_Click(object sender, RoutedEventArgs e)
        {
            UserPost postWindow = new UserPost();
            postWindow.Show();
            this.Close();
        }

        private void AddWord_Click(object sender, RoutedEventArgs e)
        {
            // Implement add word logic
        }

        private void ModifySentence_Click(object sender, RoutedEventArgs e)
        {
            // Implement modify sentence logic
        }

        private void ModifyUser_Click(object sender, RoutedEventArgs e)
        {
            // Implement modify user logic
        }

        private void ModifyWord_Click(object sender, RoutedEventArgs e)
        {
            // Implement modify word logic
        }

        private void RemoveSentence_Click(object sender, RoutedEventArgs e)
        {
            // Implement remove sentence logic
        }

        private void RemoveUser_Click(object sender, RoutedEventArgs e)
        {
            // Implement remove user logic
        }

        private void RemoveWord_Click(object sender, RoutedEventArgs e)
        {
            // Implement remove word logic
        }
    }
}
