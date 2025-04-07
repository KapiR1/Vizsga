using Microsoft.VisualStudio.TestTools.UnitTesting;
using backend.Controllers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace backend.Tests
{
    [TestClass]
    public class UserControllerTests
    {
        UserController controller;

        [TestInitialize]
        public void Setup()
        {
            controller = new UserController();
            Program.LoggedInUsers = new Dictionary<string, Profil>
            {
                { "admin", new Profil { Jogosultsag = 2 } }
            };
        }

        [TestMethod]
        public void Get_AdminUser_ReturnsOk()
        {
            var result = controller.Get("admin");
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }
    }
}
