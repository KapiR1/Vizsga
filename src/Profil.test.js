
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profil from "./Profil";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // Ha navigate-et szeretnél tesztelni, használj MemoryRouter-t
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  localStorage.setItem("token", "fakeToken");
  localStorage.setItem("name", "Teszt Felhasználó");
  localStorage.setItem("email", "test@example.com");
});

afterAll(() => {
  localStorage.clear();
});

test("Profil komponens helyes renderelése bejelentkezett felhasználónál", async () => {
  render(
    <MemoryRouter initialEntries={["/profil"]}>
      <Routes>
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Felhasználói profil/)).toBeInTheDocument();
  expect(screen.getByText(/Teszt Felhasználó/)).toBeInTheDocument();
  expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
  expect(screen.getByText(/Legnagyobb pontszám:/)).toBeInTheDocument();

  const logoutButton = screen.getByText("Kijelentkezés");
  expect(logoutButton).toBeInTheDocument();
});

test("Profil komponens navigálása, ha nincs token", async () => {
  localStorage.removeItem("token");

  render(
    <MemoryRouter initialEntries={["/profil"]}>
      <Routes>
        <Route path="/profil" element={<Profil />} />
        <Route path="/" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText("Bejelentkezés")).toBeInTheDocument());

  const loginButton = screen.getByText("Bejelentkezés");
  expect(loginButton).toBeInTheDocument();
});
