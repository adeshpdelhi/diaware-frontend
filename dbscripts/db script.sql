create table patientDetails(
	patientId varchar(50) NOT NULL PRIMARY KEY,
	name varchar(50),
	age int,
	DOB date,
	gender char(1) check (gender=='M' || gender == 'F'),
	contact varchar(15),
	alternativeContact  varchar(15),
	location varchar(50),
	address varchar(200),
	bloodGroup varchar(3),
	transplantWaitingList varchar(4) check (transplantWaitingList=='Yes' || transplantWaitingList == 'No'),
	maritalStatus varchar(10) check (maritalStatus=='Married' || maritalStatus == 'Unmarried'),
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
	viralMarketStatus varchar(4) check (viralMarketStatus=='Yes' || viralMarketStatus == 'No'),
	centreId varchar(20) references centres(centreId),
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
	panelPermissionNumber varchar(50),
	totalTmtsPermitted int,
	totalTmtsRemaining int,
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
	dryWeight decimal,
	dialysisDurationFirstTime int, --minutes/hours
	dialysisDurationRegular int,
	BFR int,
	DFR int,
	UFR int,
	heparinFree varchar(4) check (heparinFree=='Yes' || heparinFree == 'No'),
	heparinDosageBolus int,
	heparinDosageHourly int,
	dialysateType varchar(20),
	dialysateTemperature decimal,
	dialysateFrequencyPerWeek int,
	accessUsed varchar(20),
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL
);

create table vaccinationDetails(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	diseaseName varchar(50),
	dosage1 date,
	dosage2 date,
	dosage3 date,
	dosage4 date,	
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
	check(dosage1<=dosage2<=dosage3<=dosage4)
);

create table bills(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	transactionId int AUTO_INCREMENT PRIMARY KEY,
	bedType varchar(20),
	transactionType varchar(50),
	ledger varchar(50),  --ledger is the main item/service purchased
	quantity int,
	-- charges decimal,
	discount decimal,
	status varchar(20) NOT NULL check(status == 'Pending' || status== 'Paid'),
	amount decimal NOT NULL,
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL
);

create table centres(
	centreId varchar(20) NOT NULL PRIMARY KEY,
	centreName varchar(50),
	centreLocation varchar(50),
	centreMaxPatients int
);

create table costSheet(
	centreId varchar(20) references centres(centreId),
	itemId int AUTO_INCREMENT PRIMARY KEY,
	bedType varchar(20),
	panelName varchar(50),
	ledgerType varchar(20),
	ledgerName varchar(50),
	cost decimal,
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL
);

create table transactionType(
	type varchar(50) PRIMARY KEY
);

create table monitoringChartPre(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	monitoringdate date,
	monitoringId bigint PRIMARY KEY,
	machineNumber int,
	bedNumber int,
	leadTechnicianName varchar(50),
	prescribedDuration int, --hours/minutes
	startTime varchar(10),
	endTime varchar(10),
	accessUsed varchar(20),
	centralLineCreated varchar(4) check(isCentralLineCreated=='Yes' || isCentralLineCreated == 'No'),
	centralLine varchar(10),
	anticoagulant varchar(4),
	bolusAmount int,
	hourlyHeparin int,
	heparinStopBefore varchar(20),
	NSFlushingFrequency varchar(20),
	NSFlushingVolume int,
	machineTestPassed varchar(4),
	machineTestCheckedBy varchar(20),
	airDetector varchar(4),
	alarmLimits varchar(4),
	dialysateFlowRate int,
	dialysisCounterCurrentFlow varchar(4),
	dialysateTemperature decimal,
	conductivity varchar(20),
	partAConcentrationCombination varchar(20),

	--verify this

	--assessment

	postWeight decimal,
	weightGain decimal,
	targetWeightLoss decimal,
	actualWeightLoss decimal,
	physicalPain varchar(4) check( physicalPain=='Yes' || physicalPain == 'No'),
	chestAuscultation varchar(4) check(chestAuscultation =='Yes' || chestAuscultation == 'No'),
	recentSurgery varchar(4) check (recentSurgery == 'Yes' || recentSurgery == 'No'),
	peripheralOedema varchar(4) check(peripheralOedema == 'Yes' || peripheralOedema=='No'),
	respiratoryStatus varchar(50),
	temperature decimal,
	pulse int,
	BPSitting int,
	BPStanding int,
	breakfastLunchDinner varchar(4) check(breakfastLunchDinner=='Yes' || breakfastLunchDinner=='No'),
	subjectiveStatement varchar(50),
	interdialyticComplaints varchar(4) check(interdialyticComplaints=='Yes' || interdialyticComplaints=='No'),
	ambulatoryStatus varchar(20),
	hypotension varchar(4),
	headache varchar(4),
	cramps varchar(4),
	vomiting varchar(4),
	fever varchar(4),
	rigor varchar(4),
	rash varchar(4),
	chest varchar(4),
	pain varchar(4),
	other varchar(4),
	pain varchar(4),
	dyspnea varchar(4),
	pruritus varchar(4),
	generalComments varchar(50),

	--assessment over
	--access assessment 

	bruit varchar(10),
	anyAbnormality varchar(50),
	signOfAccessInfection varchar(4) check(signOfAccessInfection=='Yes' || signOfAccessInfection=='No'),
	cannulation varchar(20),
	centralLineStatus varchar(20),
	commencedBy varchar(20),
	assistedBy varchar(20),

	--access assessment over
	--verify this over .. thanks :D

	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table monitoringChartIntra(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	monitoringId bigint PRIMARY KEY,
	entryNumber int,
	entryTime varchar(10),
	bp varchar(10),
	pr varchar(10),
	ap varchar(10),
	vp varchar(10),
	tmp varchar(10),
	ufr varchar(10),
	totalUF varchar(10),
	bfr varchar(10),
	ebf varchar(10),
	remarks varchar(50),
	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

create table monitoringChartPost(
	patientId varchar(50) references patientDetails(patientId) NOT NULL,
	monitoringId bigint AUTO_INCREMENT PRIMARY KEY,
	postWeight decimal,
	weightLoss decimal,
	UFReading int,
	BPSitting int,
	BPStanding int,
	temperature decimal,
	pulse int,
	symptomaticHypotension varchar(4) check(symptomaticHypotension=='Yes' || symptomaticHypotension=='No'),
	prolongedBleeding varchar(4) check(prolongedBleeding=='Yes' || prolongedBleeding=='No'),
	bruit varchar(4) check(bruit=='Yes' || bruit=='No'),
	subjectiveStatement varchar(50),
	cardiacStatus varchar(20),
	respiratoryStatus varchar(20),
	mentalStatus varchar(20),
	ambulatoryStatus varchar(20),
	KtVAchieved varchar(20),
	EPODosage int,
	EPOGivenBy varchar(20),
	EPOSupply varchar(10),
	bloodTransfusion varchar(4) check(bloodTransfusion == 'Yes' || bloodTransfusion=='No'),
	numberOfUnits int,
	bloodBankName varchar(50),
	concludedBy varchar(20),
	anyOtherComments varchar(50),



	lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	lastModifiedBy varchar(50) NOT NULL,
);

-- create table dialysisType(
-- 	ledger varchar(50) PRIMARY KEY
-- );

-- create table procedureType(
-- 	ledger varchar(50) PRIMARY KEY
-- );

-- create table consumableType(
-- 	ledger varchar(50) PRIMARY KEY
-- );	  --to insert append expiry and batch in the ledger.. Format: LedgerName-Batchno-Expiry

-- create table pharmaType(
-- 	ledger varchar(50) PRIMARY KEY
-- );  --to insert append expiry and batch in the ledger.. Format: LedgerName-Batchno-Expiry

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

