-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2021 at 03:00 PM
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
-- Database: `aosmec2`
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

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id`, `roomId`, `status`, `keyDeposit`, `pending`, `total`, `createdAt`, `updatedAt`) VALUES
(19, 13, 'paid', 0, 0, 700, '2021-07-19', '0000-00-00'),
(20, 14, 'paid', 0, 0, 700, '2021-07-19', '0000-00-00'),
(21, 12, 'paid', 1, 0, 500, '2021-07-19', '0000-00-00'),
(22, 12, 'paid', 1, 0, 1600, '2021-07-19', '0000-00-00'),
(26, 13, 'paid', 1, 0, 1600, '2021-07-19', '2021-07-19'),
(27, 20, 'paid', 1, 0, 1000, '2021-07-19', '0000-00-00'),
(28, 42, 'paid', 1, 0, 3800, '2021-07-19', '0000-00-00'),
(29, 12, 'paid', 1, 0, 900, '2021-07-19', '0000-00-00'),
(30, 18, 'paid', 1, 0, 900, '2021-07-19', '0000-00-00');

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

--
-- Dumping data for table `bill_detail`
--

INSERT INTO `bill_detail` (`billId`, `serviceId`, `quantity`, `pending`, `total`, `status`, `createdAt`, `updatedAt`) VALUES
(21, 6, 1, 0, 200, 'paid', '0000-00-00', NULL),
(22, 5, 1, 0, 200, 'paid', '0000-00-00', NULL),
(26, 5, 1, 0, 200, 'paid', '2021-07-19', '2021-07-19'),
(28, 6, 1, 0, 200, 'paid', '0000-00-00', NULL),
(29, 7, 1, 0, 200, 'paid', '0000-00-00', NULL),
(30, 6, 2, 0, 400, 'paid', '0000-00-00', NULL);

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

--
-- Dumping data for table `checkin`
--

INSERT INTO `checkin` (`id`, `reservationId`, `accountId`, `roomId`, `checkInDate`, `checkOutDate`, `noOfDays`, `createdAt`, `updatedAt`) VALUES
(32, 44, 1, NULL, '2021-07-19', '2021-07-21', 2, '2021-07-19', NULL),
(33, 33, 1, NULL, '2021-07-16', '2021-07-17', 1, '2021-07-19', NULL),
(34, 34, 1, NULL, '2021-07-15', '2021-07-16', 1, '2021-07-19', NULL),
(35, 35, 1, NULL, '2021-07-01', '2021-07-02', 1, '2021-07-19', NULL),
(36, NULL, 1, NULL, '2021-07-19', '2021-07-19', 1, '2021-07-19', NULL),
(41, 37, 1, 13, '2021-07-19', '2021-07-21', 2, '2021-07-19', NULL),
(42, 44, 1, 20, '2021-07-19', '2021-07-21', 2, '2021-07-19', NULL),
(43, 40, 1, 42, '2021-07-19', '2021-07-22', 3, '2021-07-19', NULL),
(44, 41, 1, 12, '2021-07-19', '2021-07-20', 1, '2021-07-19', NULL),
(45, 41, 1, 18, '2021-07-19', '2021-07-20', 1, '2021-07-19', NULL);

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
  `validId` varchar(255) NOT NULL,
  `validIdType` varchar(255) NOT NULL,
  `phoneNo` varchar(20) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`id`, `checkInId`, `fname`, `lname`, `gender`, `country`, `nationality`, `address`, `validId`, `validIdType`, `phoneNo`, `createdAt`) VALUES
(20, 36, 'Axel', 'Rian', 'Male', 'Albania', 'Albanian', 'Albania', '2423313', 'Passport', '67563424', '2021-07-19'),
(21, 41, 'Seokjin', 'Kim', 'Male', 'Korea, Republic of', 'South Korean', 'Seoul', '43124124', 'Passport', '2514231', '2021-07-19'),
(22, 42, 'Luke', 'Barette', 'Male', 'Ukraine', 'Ukrainian', 'Ukraine', '632413', 'Passport', '54635241', '2021-07-19'),
(23, 43, 'Merci', 'Pyke', 'Male', 'East Timor', 'East Timorese', 'East Timor', '4324313', 'Drivers License', '236478123', '2021-07-19'),
(24, 44, 'Nicolas', 'Garric', 'Male', 'Afghanistan', 'Afghan', 'Afganistan', '4541231', 'Passport', '75676453231', '2021-07-19'),
(25, 45, 'Vin', 'Sagarino', 'Female', 'Philippines', 'Filipino', 'Lapu Lapu City, Philippines', '54321', 'Drivers License', '345341231', '2021-07-19');

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
(33, 67, 1, 'Booking.com', 2, '2021-07-16', '2021-07-17', 1, 2, '1232', NULL, '2021-07-07', '2021-07-07', NULL),
(34, 68, 1, 'Booking.com', 2, '2021-07-15', '2021-07-16', 1, 3, '324213', NULL, '2021-07-15', '2021-07-16', NULL),
(35, 69, 1, 'Booking.com', 2, '2021-07-01', '2021-07-02', 1, 1, '9102893', NULL, '2021-07-16', NULL, NULL),
(36, 70, 1, 'Agoda', 1, '2021-07-19', '2021-07-20', 1, 1, '131231', NULL, '2021-07-19', NULL, '2021-07-19'),
(37, 71, 1, 'Expedia', 2, '2021-07-19', '2021-07-21', 2, 1, '13124124', NULL, '2021-07-19', '2021-07-19', NULL),
(38, 72, 1, 'Airbnb', 1, '2021-07-20', '2021-07-21', 1, 3, '9273813', NULL, '2021-07-19', NULL, NULL),
(39, 73, 1, 'Booking.com', 1, '2021-07-22', '2021-07-24', 2, 2, '1239712', NULL, '2021-07-19', '2021-07-19', NULL),
(40, 74, 1, 'Agoda', 2, '2021-07-19', '2021-07-22', 3, 3, '4123432513', NULL, '2021-07-19', '2021-07-19', NULL),
(41, 75, 1, 'Walk In', 2, '2021-07-19', '2021-07-20', 1, 1, '5235235235', 500, '2021-07-19', '2021-07-19', NULL),
(42, 76, 1, 'Agoda', 1, '2021-07-19', '2021-07-20', 1, 1, '25231241', NULL, '2021-07-19', '2021-07-19', NULL),
(43, 77, 1, 'Booking.com', 1, '2021-07-18', '2021-07-19', 1, 1, '435412', NULL, '2021-07-19', NULL, NULL),
(44, 78, 1, 'Agoda', 2, '2021-07-19', '2021-07-21', 2, 1, '21312414', NULL, '2021-07-19', '2021-07-19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reservee`
--

CREATE TABLE `reservee` (
  `id` int(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
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

INSERT INTO `reservee` (`id`, `fname`, `lname`, `gender`, `country`, `email`, `phoneNo`, `createdAt`, `updatedAt`) VALUES
(67, 'Jinyoung', 'Choi', 'Male', 'Afghanistan', 'wF@ewfwf', '32412343421', '2021-07-07', '2021-07-07'),
(68, 'Bomi', 'Yun', 'Female', 'Afghanistan', 'weqfwe@weqewf', '341323', '2021-07-15', '2021-07-16'),
(69, 'Jimin', 'Park', 'Male', 'Korea, Republic of', 'jimin@gmail.com', '0291738172', '2021-07-16', NULL),
(70, 'Namjoon', 'Kim', 'Male', 'Korea, Republic Of', 'rm@gmail.com', '017283512', '2021-07-19', NULL),
(71, 'Seokjin', 'Kim', 'Male', 'Korea, Republic Of', 'jin@gmail.com', '8129370812', '2021-07-19', '2021-07-19'),
(72, 'Rana', 'Warrick', 'Female', 'Philippines', 'rwarrick0@hc360.com', '586-719-0487', '2021-07-19', NULL),
(73, 'Moss', 'Pyke', 'Male', 'China', 'mpyke1@dyndns.org', '850-876-5789', '2021-07-19', '2021-07-19'),
(74, 'Merci', 'Pyke', 'Male', 'East Timor', 'mketts2@uol.com.br', '230-445-1424', '2021-07-19', NULL),
(75, 'Nicolais', 'Garric', 'Other', 'United States', 'ngarric3@hugedomains.com', '817-334-1926', '2021-07-19', NULL),
(76, 'Shel', 'Eastham', 'Other', '', 'seastham4@4shared.com', '898-862-6336', '2021-07-19', NULL),
(77, 'Julius', 'Dilks', 'Male', 'Israel', 'jdilks5@nhs.uk', '156-793-9455', '2021-07-19', NULL),
(78, 'Luke', 'Barette', 'Male', 'Ukraine', 'lbarette9@google.com', '880-640-2398', '2021-07-19', NULL);

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
(30, 33, 'Regular', 1),
(32, 34, 'Regular', 1),
(33, 35, 'Regular', 1),
(34, 36, 'Single', 1),
(35, 37, 'Regular', 1),
(36, 38, 'Regular', 1),
(37, 38, 'Single', 1),
(38, 39, 'Regular', 1),
(39, 40, 'Family', 1),
(40, 41, 'Regular', 1),
(41, 41, 'Single', 1),
(42, 42, 'Single', 1),
(43, 43, 'Regular', 1),
(44, 44, 'Single', 1);

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

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `roomTypeId`, `roomNo`, `status`, `occupied`, `createdAt`) VALUES
(12, 8, 101, 'clean', 1, '2021-07-19'),
(13, 8, 102, 'clean', 1, '2021-07-19'),
(14, 8, 103, 'clean', 0, '2021-07-19'),
(15, 8, 104, 'clean', 0, '2021-07-19'),
(16, 8, 105, 'clean', 0, '2021-07-19'),
(17, 9, 106, 'clean', 0, '2021-07-19'),
(18, 9, 107, 'clean', 1, '2021-07-19'),
(19, 9, 108, 'clean', 0, '2021-07-19'),
(20, 9, 109, 'clean', 1, '2021-07-19'),
(21, 9, 110, 'clean', 0, '2021-07-19'),
(22, 8, 201, 'clean', 0, '2021-07-19'),
(23, 8, 202, 'clean', 0, '2021-07-19'),
(24, 8, 203, 'clean', 0, '2021-07-19'),
(25, 8, 204, 'clean', 0, '2021-07-19'),
(26, 8, 205, 'clean', 0, '2021-07-19'),
(27, 9, 206, 'clean', 0, '2021-07-19'),
(28, 9, 207, 'clean', 0, '2021-07-19'),
(29, 9, 208, 'clean', 0, '2021-07-19'),
(30, 9, 209, 'clean', 0, '2021-07-19'),
(31, 9, 210, 'clean', 0, '2021-07-19'),
(32, 8, 301, 'clean', 0, '2021-07-19'),
(33, 8, 302, 'clean', 0, '2021-07-19'),
(34, 8, 303, 'clean', 0, '2021-07-19'),
(35, 8, 304, 'clean', 0, '2021-07-19'),
(36, 8, 305, 'clean', 0, '2021-07-19'),
(37, 9, 306, 'clean', 0, '2021-07-19'),
(38, 9, 307, 'clean', 0, '2021-07-19'),
(39, 9, 308, 'clean', 0, '2021-07-19'),
(40, 9, 309, 'clean', 0, '2021-07-19'),
(41, 9, 310, 'clean', 0, '2021-07-19'),
(42, 10, 111, 'clean', 1, '2021-07-19'),
(43, 10, 112, 'clean', 0, '2021-07-19'),
(44, 10, 211, 'clean', 0, '2021-07-19'),
(45, 10, 212, 'clean', 0, '2021-07-19'),
(46, 10, 311, 'clean', 0, '2021-07-19');

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
(8, 'Regular', 700, 15, '2021-07-15', NULL, NULL, 1),
(9, 'Single', 500, 15, '2021-07-16', NULL, NULL, 1),
(10, 'Family', 1200, 5, '2021-07-19', NULL, NULL, 1);

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
(5, 'Shuttle', 200, 'per ride', '2021-07-14', NULL, NULL),
(6, 'Extra Bed', 200, 'per head', '2021-07-14', NULL, NULL),
(7, 'Breakfast', 200, 'per room', '2021-07-14', NULL, NULL);

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `checkin`
--
ALTER TABLE `checkin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `guest`
--
ALTER TABLE `guest`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `reservee`
--
ALTER TABLE `reservee`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `reserve_room`
--
ALTER TABLE `reserve_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `room_type`
--
ALTER TABLE `room_type`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
