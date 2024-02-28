USE my_database;
CREATE TABLE Equipment (
    EquipmentName VARCHAR(255) NOT NULL,
    Model VARCHAR(255) NOT NULL,
    SerialNumber VARCHAR(255) NOT NULL,
    EquipmentDepartment VARCHAR(255) NOT NULL,
    EquipmentDescription TEXT NOT NULL,
    MaintenanceHistory TEXT NOT NULL,
    Manufacturer VARCHAR(255) NOT NULL,
    CountryOfOrigin VARCHAR(255) NOT NULL,
    WarrantyExpiryDate DATE,
    EquipmentManuals VARCHAR(255) NOT NULL,
    EquipmentImage VARCHAR(255) NOT NULL,
    PRIMARY KEY (EquipmentName)
);
