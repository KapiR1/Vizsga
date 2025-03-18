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
            MondatokPost postWindow = new MondatokPost();
            postWindow.Show();
            this.Close();
        }

        private void AddUser_Click(object sender, RoutedEventArgs e)
        {
            UserPost postWindow = new UserPost();
            postWindow.Show();
            this.Close();
        }

        private void AddWord_Click(object sender, RoutedEventArgs e)
        {
            SzavakPost postWindow = new SzavakPost();
            postWindow.Show();
            this.Close();
        }

        private void ModifySentence_Click(object sender, RoutedEventArgs e)
        {
            MondatokPut putWindow = new MondatokPut();
            putWindow.Show();
            this.Close();
        }

        private void ModifyUser_Click(object sender, RoutedEventArgs e)
        {
            UserPut putWindow = new UserPut();
            putWindow.Show();
            this.Close();
        }

        private void ModifyWord_Click(object sender, RoutedEventArgs e)
        {
            SzavakPut putWindow = new SzavakPut();
            putWindow.Show();
            this.Close();
        }

        private void RemoveSentence_Click(object sender, RoutedEventArgs e)
        {
            MondatokDelete deleteWindow = new MondatokDelete();
            deleteWindow.Show();
            this.Close();
        }

        private void RemoveUser_Click(object sender, RoutedEventArgs e)
        {
            UserDelete deleteWindow = new UserDelete();
            deleteWindow.Show();
            this.Close();
        }

        private void RemoveWord_Click(object sender, RoutedEventArgs e)
        {
            SzavakDelete deleteWindow = new SzavakDelete();
            deleteWindow.Show();
            this.Close();
        }
    }
}
