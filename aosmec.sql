-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2021 at 03:02 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aosmec`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int(255) NOT NULL,
  `roomId` int(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `total` int(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `billdetail`
--

CREATE TABLE `billdetail` (
  `billId` int(255) NOT NULL,
  `serviceId` int(255) NOT NULL,
  `quantity` int(3) NOT NULL,
  `total` int(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `checkin`
--

CREATE TABLE `checkin` (
  `id` int(255) NOT NULL,
  `reservationId` int(255) NOT NULL,
  `accountId` int(255) NOT NULL,
  `roomId` int(255) NOT NULL,
  `checkInDate` date NOT NULL,
  `checkOutDate` date NOT NULL,
  `noOfDays` int(11) NOT NULL,
  `noOfHead` int(3) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `id` int(11) NOT NULL,
  `checkInId` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `address` int(11) NOT NULL,
  `govId` int(11) NOT NULL,
  `govIdType` int(11) NOT NULL,
  `phoneNo` int(11) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(255) NOT NULL,
  `reserveeId` int(255) NOT NULL,
  `accountId` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `checkInDate` date NOT NULL,
  `checkOutDate` date NOT NULL,
  `noOfDays` int(11) NOT NULL,
  `noOfHead` int(2) NOT NULL,
  `confirmationNo` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reservee`
--

CREATE TABLE `reservee` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNo` int(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(255) NOT NULL,
  `roomTypeId` int(255) NOT NULL,
  `roomNo` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roomtype`
--

CREATE TABLE `roomtype` (
  `id` int(255) NOT NULL,
  `name` int(255) NOT NULL,
  `rate` int(255) NOT NULL,
  `totalNoOfRoom` int(10) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL,
  `deletedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rate` int(255) NOT NULL,
  `pricing` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomFk` (`roomId`);

--
-- Indexes for table `billdetail`
--
ALTER TABLE `billdetail`
  ADD PRIMARY KEY (`billId`,`serviceId`),
  ADD KEY `serviceId` (`serviceId`);

--
-- Indexes for table `checkin`
--
ALTER TABLE `checkin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservationFk` (`reservationId`),
  ADD KEY `accountFk` (`accountId`),
  ADD KEY `roomFk` (`roomId`);

--
-- Indexes for table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkInFk` (`checkInId`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accountFk` (`accountId`),
  ADD KEY `reserveeFk` (`reserveeId`) USING BTREE;

--
-- Indexes for table `reservee`
--
ALTER TABLE `reservee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomTypeFk` (`roomTypeId`);

--
-- Indexes for table `roomtype`
--
ALTER TABLE `roomtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checkin`
--
ALTER TABLE `checkin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guest`
--
ALTER TABLE `guest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservee`
--
ALTER TABLE `reservee`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roomtype`
--
ALTER TABLE `roomtype`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`);

--
-- Constraints for table `billdetail`
--
ALTER TABLE `billdetail`
  ADD CONSTRAINT `billdetail_ibfk_1` FOREIGN KEY (`billId`) REFERENCES `bill` (`id`),
  ADD CONSTRAINT `billdetail_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`);

--
-- Constraints for table `checkin`
--
ALTER TABLE `checkin`
  ADD CONSTRAINT `checkin_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `reservation` (`id`),
  ADD CONSTRAINT `checkin_ibfk_2` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `checkin_ibfk_3` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`);

--
-- Constraints for table `guest`
--
ALTER TABLE `guest`
  ADD CONSTRAINT `guest_ibfk_1` FOREIGN KEY (`checkInId`) REFERENCES `checkin` (`id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `subFk` FOREIGN KEY (`reserveeId`) REFERENCES `reservee` (`id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`roomTypeId`) REFERENCES `roomtype` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
