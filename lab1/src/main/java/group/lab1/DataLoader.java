package group.lab1;

import com.github.javafaker.Address;
import com.github.javafaker.Faker;
import org.apache.commons.lang3.tuple.MutablePair;
import org.apache.commons.lang3.tuple.Pair;

import javax.xml.transform.Result;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DataLoader {
    Statement stmt;
    Faker faker;

    public DataLoader(String DB_URL,String USER,String PASS) {
        faker = new Faker();
        try {
            Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void populateAll(){
        try {
            populateUsers();
            populateProducers();
            populateBreweries();
            populateBeers();
            populateBeerBreweries();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteAll(){
        try {
            deleteFromBeerBreweries();
            deleteFr0mBeers();
            deleteFromBreweries();
            deleteFromProducers();
            deleteFromUserss();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void populateProducers() throws SQLException {
        stmt.execute("ALTER SEQUENCE producers_id_seq  RESTART WITH 1");

        List<String> producerSizes = Arrays.asList("Large","Small","Medium");

        for(int i=1;i<=1000;i++){
            String insert = "INSERT INTO Producers(country,description,founding_year,name,nr_of_breweries) VALUES"+"\n";
            StringBuilder batch= new StringBuilder();
            for(int j=0;j<1000;j++){
                String name = faker.company().name().replace("'","''");
                String country = faker.address().country().replace("'","''");
                String descr = producerSizes.get(faker.random().nextInt(producerSizes.size())) + " producer in " + country;
                descr.replace("'","''");
                String foundingYear = faker.random().nextInt(1850,2000).toString();
                String nrOfBreweries = faker.random().nextInt(20,500).toString();

                batch.append("('").append(country).append("','").append(descr).append("',").append(foundingYear).append(",'").append(name).append("',").append(nrOfBreweries).append("),").append("\n");
            }
            batch.deleteCharAt(batch.length()-2);

            insert+=batch;
            stmt.execute(insert);
            if(i%100==0)
                System.out.println("Inserted "+ i * 1000 +" rows into producers");
        }
    }

    public void populateBreweries() throws SQLException {
        stmt.execute("ALTER SEQUENCE breweries_id_seq  RESTART WITH 1");

        List<String> brewerySizes = Arrays.asList("Large","Small","Medium");

        for(int i=1;i<=1000;i++){
            String insert = "INSERT INTO Breweries(description,location,name,website,founding_year) VALUES"+"\n";
            StringBuilder batch = new StringBuilder();
            for(int j=0;j<1000;j++){
                Address addr = faker.address();
                String name = addr.firstName().replace("'","''");
                String location = addr.city().replace("'","''");
                String descr = brewerySizes.get(faker.random().nextInt(brewerySizes.size())) + " brewery in "+location;
                descr.replace("'","''");
                String website = name + ".com";
                website.replace("'","''");
                String foundingYear = faker.random().nextInt(1850,2000).toString();

                batch.append("('").append(descr).append("','").append(location).append("','").append(name).append("','").append(website).append("',").append(foundingYear).append("),").append("\n");
            }
            batch.deleteCharAt(batch.length()-2);

            insert+=batch;
            stmt.execute(insert);
            if(i%100==0)
                System.out.println("Inserted "+ i * 1000 +" rows into breweries");
        }
    }

    public void populateBeers() throws SQLException {
        stmt.execute("ALTER SEQUENCE beers_id_seq  RESTART WITH 1");

        List<String> packagings = Arrays.asList("can","bottle","keg");

        for(int i=1;i<=1000;i++){
            String insert = "INSERT INTO Beers(alcohol_level,color,name,packaging,price,producer_id) VALUES"+"\n";
            StringBuilder batch = new StringBuilder();


            for(int j=0;j<1000;j++){
                String name = faker.beer().name().replace("'","''");
                String color = faker.beer().style().replace("'","''");
                String packaging = packagings.get(faker.random().nextInt(packagings.size())).replace("'","''");
                String alcoholLvl = faker.random().nextInt(3,10).toString();
                String price = faker.random().nextInt(5,20).toString();
                String producer_id = faker.random().nextInt(1,1000000).toString();

                batch.append("(").append(alcoholLvl).append(",'").append(color).append("','").append(name).append("','").append(packaging).append("',").append(price).append(",").append(producer_id).append("),").append("\n");
            }
            batch.deleteCharAt(batch.length()-2);

            insert+=batch;
            stmt.execute(insert);
            if(i%100==0)
                System.out.println("Inserted "+ i * 1000 +" rows into beers");
        }
    }

    public void populateBeerBreweries() throws SQLException {
        stmt.execute("ALTER SEQUENCE beer_brewery_id_seq  RESTART WITH 1");

        Integer BoundForBeerId = 10;
        Integer BoundForBrewery = 10000;

        String beer_id = "";
        String brewery_id = "";


        for(int i=1;i<=10000;i++){
            String insert = "INSERT INTO Beer_brewery(quantity,quality_tested,beer_id,brewery_id) VALUES"+"\n";
            StringBuilder batch = new StringBuilder();

            for(int j=0;j<1000;j++){
                String quantity = faker.random().nextInt(100,200).toString();
                String tested = faker.random().nextBoolean().toString();

                if(j%100==0){
                    beer_id = faker.random().nextInt(BoundForBeerId-9,BoundForBeerId).toString();
                    BoundForBeerId += 10;
                    BoundForBrewery += 10000;
                }

                brewery_id = faker.random().nextInt(BoundForBrewery-9999,BoundForBrewery).toString();

                batch.append("(").append(quantity).append(",").append(tested).append(",").append(beer_id).append(",").append(brewery_id).append("),").append("\n");
                }

            batch.deleteCharAt(batch.length()-2);

            insert+=batch;
            stmt.execute(insert);
            if(i%100==0)
                System.out.println("Inserted "+ i * 1000 +" rows into beer_brewery");
        }
    }

    public void deleteFromBeerBreweries() throws SQLException {
        stmt.execute("DELETE FROM beer_brewery");
        System.out.println("Deleted data in beer_brewery");
    }

    public void deleteFr0mBeers() throws SQLException {
        stmt.execute("DELETE FROM beers");
        System.out.println("Deleted data in beers");
    }

    public void deleteFromBreweries() throws SQLException {
        stmt.execute("DELETE FROM breweries");
        System.out.println("Deleted data in breweries");
    }

    public void deleteFromProducers() throws SQLException {
        stmt.execute("DELETE FROM producers");
        System.out.println("Deleted data in producers");
    }

    public void deleteFromUserss() throws SQLException {
        stmt.execute("DELETE FROM users");
        System.out.println("Deleted data from users");
        stmt.execute("DELETE FROM users_profiles");
        System.out.println("Deleted from user_profiles");
    }

    public void populateUsers() throws SQLException{


        for(int i=0;i<9;i++){
            String insertUsers = "INSERT INTO users(user_name,password,activated) VALUES"+"\n";
            String insertUserProfiles = "INSERT INTO user_profiles(user_name,address,birthday,description,email) VALUES" +"\n";
            StringBuilder batchUsers = new StringBuilder();
            StringBuilder batchProfiles = new StringBuilder();

            for(int j=1;j<=1000;j++){
                String name = faker.name().firstName()+faker.name().lastName()+String.valueOf(i*1000+j);
                name = name.replace("'","").toLowerCase();
                String pass = faker.internet().password(10,15).replace("'","''");
                String address = faker.address().streetAddress().replace("'","''");
                String birthday = faker.date().birthday().toString();
                String descritption = faker.lorem().sentence(3).replace("'","''");
                String email = faker.internet().emailAddress().replace("'","''");
                batchUsers.append("('").append(name).append("','").append(pass).append("',false").append("),").append("\n");
                batchProfiles.append("('").append(name).append("','").append(address).append("','").append(birthday).append("','").append(descritption).append("','").append(email).append("'),").append("\n");
            }

            batchUsers.deleteCharAt(batchUsers.length()-2);
            batchProfiles.deleteCharAt(batchProfiles.length()-2);

            insertUsers+=batchUsers;
            insertUserProfiles+=batchProfiles;
            stmt.execute(insertUsers);
            stmt.execute(insertUserProfiles);
            System.out.println("Inserted "+ 1+(i * 1000) +" rows into users and user_profiles");
        }
    }

}
