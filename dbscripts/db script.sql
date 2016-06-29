create table patientDetails(
	patientId varchar(50) NOT NULL PRIMARY KEY,
	name varchar(50),
	age int,
	DOB date,
	gender char(1),
	contact varchar(15),
	alternativeContact  varchar(15),
	location varchar(50),
	address varchar(200),
	bloodGroup varchar(3),
	transplantWaitingList boolean,
	maritalStatus boolean,
	emergencyContactName varchar(50),
	emergencyContactRelationship varchar(50),
	emergencyContactMobile varchar(10),
	numberOfChildren int,
	childrenContact varchar(15),
	employementStatus varchar(20),
	officeName varchar(50),
	officeAddress varchar(200),
	otherClinicalDetails varchar(200),
	modeOfPayment varchar(50),
	refferedBy varchar(50),
	doctorName varchar(50),
	viralMarketStatus boolean,
	centre varchar(20),
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL
);
create table panels(
	panelId bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
	panelName varchar(50),
	panelDetails varchar(200)
); --only admin manageable
create table panelDetails(
	panelId bigint references panels(panelId) NOT NULL,
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	panelPermissionDate date,
	totalTmtsPermitted int,
	renewalDate date,
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
	PRIMARY KEY(panelId,patientId)
);

create table otherDetails(
	patientId varchar(50) references patientDetails(patientId) NOT NULL PRIMARY KEY,
	PAN varchar(50),
	aadhar varchar(50),
	passport varchar(50)
	otherCard1 varchar(50),
	otherCard2 varchar(50),
	otherCard3 varchar(50),
	PANData BLOB,
	aadharData BLOB,
	passportData BLOB
	otherCard1Data BLOB,
	otherCard2Data BLOB,
	otherCard3Data BLOB,
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL
);
create table diseases(
	diseaseName varchar(100) NOT NULL PRIMARY KEY
); --onyl admin manageable

create table medicalHistory(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	diseaseName varchar(100) references diseases(diseaseName),
	doctorComments varchar(200),
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
	PRIMARY KEY(patientId,diseaseName)
);

create table majorClinicalEvents(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	eventId bigint AUTO_INCREMENT PRIMARY KEY,
	eventDetails varchar(200),
	eventDate date,
	eventComment varchar(100),
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	carePlanId  AUTO_INCREMENT,
	prescriptionDate date,
	dryWeight int,
	dialysisDurationFirstTime int, --minutes/hours
	dialysisDurationRegular int,
	BFR int,
	
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table dialysisCarePlan(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

