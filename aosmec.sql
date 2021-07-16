-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2021 at 09:23 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

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
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `fname`, `lname`, `birthdate`, `gender`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'admin', '$2b$10$ISPjfORnCJEBZkLxxA8DSO6djN4A3KSUk8xz7/Iu.gtwlr3Kkc/Ca', 'Admin', 'A', '1999-09-14', 'Female', '0000-00-00', NULL, NULL),
(3, 'frontdesk', '$2b$10$1Oz9w66gG1p62HA1Sdi3kOqQYD7RFoHbMnbeQ8r1I3xLQdiDvDZ5q', 'FR', 'Desk', '1994-06-28', 'Female', '2021-06-28', NULL, NULL),
(27, 'test', '$2b$10$CaNdYfSAI3aUl0Uwh958v.ZsuntOlJ6JqaWlGfUnP/WzBifUeko9m', 'test', 'test', '1993-05-13', 'Male', '2021-07-15', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int(255) NOT NULL,
  `roomId` int(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `keyDeposit` tinyint(1) NOT NULL,
  `pending` int(11) NOT NULL,
  `total` int(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bill_detail`
--

CREATE TABLE `bill_detail` (
  `billId` int(255) NOT NULL,
  `serviceId` int(255) NOT NULL,
  `quantity` int(3) NOT NULL,
  `pending` int(11) DEFAULT NULL,
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
  `reservationId` int(255) DEFAULT NULL,
  `accountId` int(255) NOT NULL,
  `roomId` int(255) DEFAULT NULL,
  `checkInDate` date NOT NULL DEFAULT current_timestamp(),
  `checkOutDate` date NOT NULL,
  `noOfDays` int(11) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `id` int(255) NOT NULL,
  `checkInId` int(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `validId` int(255) NOT NULL,
  `validIdType` varchar(255) NOT NULL,
  `phoneNo` int(20) DEFAULT NULL,
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
  `status` tinyint(1) NOT NULL,
  `checkInDate` date NOT NULL,
  `checkOutDate` date NOT NULL,
  `noOfDays` int(11) NOT NULL,
  `noOfHead` int(2) NOT NULL,
  `confirmationNo` varchar(255) DEFAULT NULL,
  `reservationFee` int(255) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id`, `reserveeId`, `accountId`, `type`, `status`, `checkInDate`, `checkOutDate`, `noOfDays`, `noOfHead`, `confirmationNo`, `reservationFee`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(33, 67, 1, 'Booking.com', 1, '2021-07-07', '2021-07-09', 2, 2, '1232', NULL, '2021-07-07', '2021-07-07', NULL),
(34, 68, 1, 'Booking.com', 1, '2021-07-15', '2021-07-16', 1, 2, '324213', NULL, '2021-07-15', NULL, NULL);

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
  `phoneNo` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservee`
--

INSERT INTO `reservee` (`id`, `name`, `gender`, `country`, `email`, `phoneNo`, `createdAt`, `updatedAt`) VALUES
(67, 'fwefw', 'Male', 'Afghanistan', 'wF@ewfwf', '32412343421', '2021-07-07', '2021-07-07'),
(68, 'weqfqew', 'Female', 'Afghanistan', 'weqfwe@weqewf', '341323', '2021-07-15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reserve_room`
--

CREATE TABLE `reserve_room` (
  `id` int(11) NOT NULL,
  `reservationId` int(11) NOT NULL,
  `roomType` varchar(255) NOT NULL,
  `noOfRoom` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reserve_room`
--

INSERT INTO `reserve_room` (`id`, `reservationId`, `roomType`, `noOfRoom`) VALUES
(30, 33, 'single', 1),
(32, 34, 'single', 1);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(255) NOT NULL,
  `roomTypeId` int(255) NOT NULL,
  `roomNo` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `occupied` tinyint(1) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `room_type`
--

CREATE TABLE `room_type` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rate` int(255) NOT NULL,
  `totalNoOfRoom` int(10) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `floor_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_type`
--

INSERT INTO `room_type` (`id`, `name`, `rate`, `totalNoOfRoom`, `createdAt`, `updatedAt`, `deletedAt`, `floor_number`) VALUES
(8, 'singl', 324, 324, '2021-07-15', NULL, NULL, 1);

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
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `rate`, `pricing`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(5, 'shuttle', 100, 'per ride', '2021-07-14', NULL, NULL),
(6, 'bed', 200, 'per head', '2021-07-14', NULL, NULL),
(7, 'clean room', 2009, 'per room', '2021-07-14', NULL, NULL);

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
-- Indexes for table `bill_detail`
--
ALTER TABLE `bill_detail`
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
-- Indexes for table `reserve_room`
--
ALTER TABLE `reserve_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservationId` (`reservationId`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomTypeFk` (`roomTypeId`);

--
-- Indexes for table `room_type`
--
ALTER TABLE `room_type`
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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `checkin`
--
ALTER TABLE `checkin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `guest`
--
ALTER TABLE `guest`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `reservee`
--
ALTER TABLE `reservee`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `reserve_room`
--
ALTER TABLE `reserve_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `room_type`
--
ALTER TABLE `room_type`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`);

--
-- Constraints for table `bill_detail`
--
ALTER TABLE `bill_detail`
  ADD CONSTRAINT `bill_detail_ibfk_1` FOREIGN KEY (`billId`) REFERENCES `bill` (`id`),
  ADD CONSTRAINT `bill_detail_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`);

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
-- Constraints for table `reserve_room`
--
ALTER TABLE `reserve_room`
  ADD CONSTRAINT `reserve_room_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `reservation` (`id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`roomTypeId`) REFERENCES `room_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
