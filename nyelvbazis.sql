-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 22. 15:37
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `nyelvbazis`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `profil`
--

CREATE TABLE `profil` (
  `id` int(11) NOT NULL,
  `nev` varchar(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `jelszo` varchar(32) NOT NULL,
  `pontszam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szavak_magyar`
--

CREATE TABLE `szavak_magyar` (
  `id` int(11) NOT NULL,
  `magyar_szo` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szavak_magyar`
--

INSERT INTO `szavak_magyar` (`id`, `magyar_szo`) VALUES
(1, 'jogász'),
(2, 'jogásznő'),
(3, 'fa'),
(4, 'kabát'),
(5, 'baleset'),
(6, 'olaj'),
(7, 'színész'),
(8, 'színésznő'),
(9, 'repülőtér'),
(10, 'víz'),
(11, 'levegő'),
(12, 'szárny'),
(13, 'diákfiú'),
(14, 'diáklány'),
(15, 'fiúbarát'),
(16, 'lánybarát'),
(17, 'szerelem'),
(18, 'elemzés'),
(19, 'állat'),
(20, 'év'),
(21, 'hirdetés'),
(22, 'készülék'),
(23, 'fa'),
(24, 'fájl'),
(25, 'terület'),
(26, 'érv'),
(27, 'cikk'),
(28, 'művész'),
(29, 'művésznő'),
(30, 'szamár'),
(31, 'szempont'),
(32, 'ügy'),
(33, 'atom'),
(34, 'szerző'),
(35, 'szerzőnő'),
(36, 'repülőgép'),
(37, 'fürdőszoba'),
(38, 'szomszédság'),
(39, 'csata'),
(40, 'baba'),
(41, 'csók'),
(42, 'könyvtár'),
(43, 'jegy'),
(44, 'jegy'),
(45, 'táska'),
(46, 'erdő'),
(47, 'gomb'),
(48, 'kar'),
(49, 'szellő'),
(50, 'bagoly');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szavak_spanyol`
--

CREATE TABLE `szavak_spanyol` (
  `id` int(11) NOT NULL,
  `spanyol_szo` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szavak_spanyol`
--

INSERT INTO `szavak_spanyol` (`id`, `spanyol_szo`) VALUES
(1, 'el abogado'),
(2, 'la abogada'),
(3, 'el árbol'),
(4, 'el abrigo'),
(5, 'el accidente'),
(6, 'el aceite'),
(7, 'el actor'),
(8, 'la actriz'),
(9, 'el aeropuerto'),
(10, 'el agua'),
(11, 'el aire'),
(12, 'el ala'),
(13, 'el alumno'),
(14, 'la alumna'),
(15, 'el amigo'),
(16, 'la amiga'),
(17, 'el amor'),
(18, 'el análisis'),
(19, 'el animal'),
(20, 'el año'),
(21, 'el anuncio'),
(22, 'el aparato'),
(23, 'el árbol'),
(24, 'el archivo'),
(25, 'el área'),
(26, 'el argumento'),
(27, 'el artículo'),
(28, 'el artista'),
(29, 'la artista'),
(30, 'el asno'),
(31, 'el aspecto'),
(32, 'el asunto'),
(33, 'el átomo'),
(34, 'el autor'),
(35, 'la autora'),
(36, 'el avión'),
(37, 'el baño'),
(38, 'el barrio'),
(39, 'la batalla'),
(40, 'el bebé'),
(41, 'el beso'),
(42, 'la biblioteca'),
(43, 'el billete'),
(44, 'el boleto'),
(45, 'el bolso'),
(46, 'el bosque'),
(47, 'el botón'),
(48, 'el brazo'),
(49, 'la brisa'),
(50, 'el búho');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `szavak_magyar`
--
ALTER TABLE `szavak_magyar`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `szavak_spanyol`
--
ALTER TABLE `szavak_spanyol`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `profil`
--
ALTER TABLE `profil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szavak_magyar`
--
ALTER TABLE `szavak_magyar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT a táblához `szavak_spanyol`
--
ALTER TABLE `szavak_spanyol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
