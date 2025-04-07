-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 07. 12:03
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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
-- Tábla szerkezet ehhez a táblához `jogok`
--

CREATE TABLE `jogok` (
  `id` int(11) NOT NULL,
  `szint` int(1) NOT NULL,
  `nev` varchar(32) NOT NULL,
  `leiras` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `jogok`
--

INSERT INTO `jogok` (`id`, `szint`, `nev`, `leiras`) VALUES
(1, 1, 'felhasználó', 'megerősített regisztráció'),
(2, 2, 'Admin', 'Teljes hozzáférés'),
(3, 0, 'inaktív', 'friss regisztráció');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `mondatok_magyar`
--

CREATE TABLE `mondatok_magyar` (
  `Id` int(11) NOT NULL,
  `magyar_mondatok` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `mondatok_magyar`
--

INSERT INTO `mondatok_magyar` (`Id`, `magyar_mondatok`) VALUES
(1, 'Szeretek könyveket olvasni a szabadidőmben.'),
(2, 'Tudsz segíteni nekem ebben a matematika háziban?'),
(3, 'A nap ma nagyon fényesen süt.'),
(4, 'A barátaimmal ma este moziba megyünk.'),
(5, 'A lány gitározni tanul.'),
(6, 'Tegnap egy ízletes pizzát ettem.'),
(7, 'Merre van a mosdó?'),
(8, 'Ez a könyv nagyon érdekes és oktató jellegű.'),
(9, 'Nyaralást tervezünk a tengerparton.'),
(10, 'Szeretek zenét hallgatni tanulás közben.'),
(11, 'Szeretek különböző országokba utazni.'),
(12, 'A film amit tegnap este láttunk hihetetlen volt.'),
(13, 'A nap este nyolckor megy le.'),
(14, 'A mai nap jó az edzéshez.'),
(15, 'Tervezünk egy kirándulást a hegyekbe.'),
(16, 'A hétvégén strandra megyünk.'),
(17, 'A kutya játszik a kertben.'),
(18, 'Elmegyek a boltba ételt venni.'),
(19, 'A családom egy kisvárosban él.'),
(20, 'Egy nagyon jó sorozatot nézek.'),
(21, 'Van egy Bruno nevű kutyám.'),
(22, 'A lánytestvérem Madridban él.'),
(23, 'A kedvenc színem a kék.'),
(24, 'Utálom a hétfőket.'),
(25, 'Nyáron nagyon meleg van.'),
(26, 'A szüleim tanárok.'),
(27, 'Meg akarok tanulni főzni.'),
(28, 'Korán keltem ma reggel.'),
(29, 'Fáradt vagyok az egész napos munka után.'),
(30, 'A legjobb fiúbarátom nagyon vicces.'),
(31, 'Hány éves vagy?'),
(32, 'Mi a foglalkozásod?'),
(33, 'Milyen féle zenét szeretsz?'),
(34, 'Van háziállatod?'),
(35, 'Mi a kedvenc filmed?'),
(36, 'Beszélsz más nyelveket?');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `mondatok_spanyol`
--

CREATE TABLE `mondatok_spanyol` (
  `Id` int(11) NOT NULL,
  `spanyol_mondatok` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `mondatok_spanyol`
--

INSERT INTO `mondatok_spanyol` (`Id`, `spanyol_mondatok`) VALUES
(1, 'Me gusta leer libros en mi tiempo libre.'),
(2, '¿Puedes ayudarme con esta tarea de matemáticas?'),
(3, 'El sol brilla muy fuerte hoy.'),
(4, 'Mis amigos y yo vamos al cine esta noche.'),
(5, 'La niña está aprendiendo a tocar la guitarra.'),
(6, 'Ayer comí una pizza deliciosa.'),
(7, '¿Dónde está el baño?'),
(8, 'Este libro es muy interesante y educativo.'),
(9, 'Estamos planeando unas vacaciones en la playa.'),
(10, 'Me encanta escuchar música mientras estudio.'),
(11, 'Me encanta viajar a diferentes países.'),
(12, 'La película que vimos anoche fue increíble.'),
(13, 'El sol se pone a las ocho de la noche.'),
(14, 'Hoy es un buen día para hacer ejercicio.'),
(15, 'Estamos planeando un viaje a las montañas.'),
(16, 'Este fin de semana vamos a la playa.'),
(17, 'El perro está jugando en el jardín.'),
(18, 'Voy al supermercado a comprar comida.'),
(19, 'Mi familia vive en una ciudad pequeña.'),
(20, 'Estoy viendo una serie muy buena.'),
(21, 'Tengo un perro llamado Bruno.'),
(22, 'Mi hermana vive en Madrid.'),
(23, 'Mi color favorito es el azul.'),
(24, 'Yo odio los lunes.'),
(25, 'Hace mucho calor en verano.'),
(26, 'Mis padres son profesores.'),
(27, 'Quiero aprender a cocinar.'),
(28, 'Me desperté temprano esta mañana.'),
(29, 'Estoy cansado después de trabajar todo el día.'),
(30, 'Mi mejor amigo es muy gracioso.'),
(31, '¿Cuántos años tienes?'),
(32, '¿Cuál es tu profesión?'),
(33, '¿Qué tipo de música te gusta?'),
(34, '¿Tienes alguna mascota?'),
(35, '¿Cuál es tu película favorita?'),
(36, '¿Hablas otros idiomas?');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `profil`
--

CREATE TABLE `profil` (
  `id` int(11) NOT NULL,
  `nev` varchar(32) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `SALT` varchar(64) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `HASH` varchar(64) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `pontszam` int(11) NOT NULL,
  `Jogosultsag` int(1) NOT NULL,
  `Aktiv` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `profil`
--

INSERT INTO `profil` (`id`, `nev`, `email`, `SALT`, `HASH`, `pontszam`, `Jogosultsag`, `Aktiv`) VALUES
(1, 'Janika', 'janca@kkszki.hu', '2ZME2W3POlOb61SJmO0gGBXSn4N47cZ6MhF4NTqjOHxdmxnexDxXpdJ5i7K0oCXL', '88cffec17e188d6caf818d1344beaa6519a6ad0e51dd61a43cf0284e9d3df236', 0, 2, 1),
(2, 'Dominik', 'dominik@gmail.com', '55KMb4aGYq7uPaaGlBUVyKGDP8LznbhLh8geaPpXLLKZdqDZFxyIQyF5iun5W3Zm', '947e72bd81372218ff4e88b8f4522d069c90937176304326783d638582b2b22e', 0, 1, 0),
(13, 'Béla', 'iroczkib@kkszki.hu', '2ZME2W3POlOb61SJmO0gGBXSn4N47cZ6MhF4NTqjOHxdmxnexDxXpdJ5i7K0oCXL', '88cffec17e188d6caf818d1344beaa6519a6ad0e51dd61a43cf0284e9d3df236', 0, 1, 0),
(14, 'teszt', 'macsekl@kkszki.hu', 'MFE9RAUjdrP9p9d11HbBR08C9CvYL0kCQOvz6rMzWWssSjVaMklZ7ppdxhEAH9dk', 'd3d8a4249abc474ef62c85284bb1b111efac0d8ea07da31b001bbeb78880bf00', 0, 1, 1),
(15, 'admin', 'admin@gmail.com', '0WEEXTzSrKXuNy66yPMdxcMRSH0mCh5ODvs18oywKLNVVKmAsZgigxy19s6Gprml', '2daaaba4d6ad81a2792f3b4725073fb8f32693b6fb334745e9962258b75da9da', 0, 2, 1),
(16, 'user', 'user@gmail.com', '1epv92tujYSOFjty70GEpEeW4f5t16GN1NEAUMDhrN5m8e41dVaGqiJfiOXcgHG0', '90d1492ed6673345f151df31ca1eaa647cb94819076d7ace4c3778c3965dd672', 0, 1, 1);

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
(3, 'kutya'),
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
(3, 'el perro'),
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
-- A tábla indexei `jogok`
--
ALTER TABLE `jogok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `szint` (`szint`),
  ADD UNIQUE KEY `szint_2` (`szint`),
  ADD KEY `nev` (`nev`);

--
-- A tábla indexei `mondatok_magyar`
--
ALTER TABLE `mondatok_magyar`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `mondatok_spanyol`
--
ALTER TABLE `mondatok_spanyol`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Jogosultsag` (`Jogosultsag`),
  ADD KEY `nev` (`nev`,`email`);

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
-- AUTO_INCREMENT a táblához `jogok`
--
ALTER TABLE `jogok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `mondatok_magyar`
--
ALTER TABLE `mondatok_magyar`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT a táblához `mondatok_spanyol`
--
ALTER TABLE `mondatok_spanyol`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT a táblához `profil`
--
ALTER TABLE `profil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `mondatok_spanyol`
--
ALTER TABLE `mondatok_spanyol`
  ADD CONSTRAINT `mondatok_spanyol_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `mondatok_magyar` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `profil`
--
ALTER TABLE `profil`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Jogosultsag`) REFERENCES `jogok` (`szint`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `szavak_magyar`
--
ALTER TABLE `szavak_magyar`
  ADD CONSTRAINT `szavak_magyar_ibfk_1` FOREIGN KEY (`id`) REFERENCES `szavak_spanyol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
