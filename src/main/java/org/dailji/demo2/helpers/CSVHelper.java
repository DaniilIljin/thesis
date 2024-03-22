package org.dailji.demo2.helpers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.dailji.demo2.model.Material;
import org.dailji.demo2.model.MaterialClass;
import org.dailji.demo2.model.Package;

// This is just a helper class to read the package data from the csv and save it to the db, could be deleted later??
public class CSVHelper {
    public static List<Package> csvToPackages(String filePath) throws IOException {
        try (InputStream is = Files.newInputStream(Paths.get(filePath));
             BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim().withDelimiter(';'));) {

            List<Package> packages = new ArrayList<Package>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                Package p = new Package(
                        Long.parseLong(csvRecord.get(0)),
                        csvRecord.get(1),
                        csvRecord.get(2),
                        parseDoubleValue(csvRecord.get(3)),
                        csvRecord.get(4),
                        Material.getByCode(parseIntegerValue(csvRecord.get(5))),
                        Boolean.parseBoolean(csvRecord.get(6)),
                        MaterialClass.getByCode(parseIntegerValue(csvRecord.get(7))),
                        parseDoubleValue(csvRecord.get(8))
                );
                packages.add(p);
            }
            return packages;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static Double parseDoubleValue(String stringValue) {
        if (stringValue.equalsIgnoreCase("NULL")) {
            return null;
        }
        try {
            return Double.valueOf(stringValue);
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }
    public static Integer parseIntegerValue(String stringValue) {
        if (stringValue.equalsIgnoreCase("NULL")) {
            return null;
        }
        try {
            return Integer.valueOf(stringValue);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}