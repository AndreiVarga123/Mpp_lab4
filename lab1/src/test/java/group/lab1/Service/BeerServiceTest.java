//package group.lab1.Service;
//
//import group.lab1.Model.Beer;
//import group.lab1.Model.BeerDTO;
//import group.lab1.Model.Producer;
//import group.lab1.Repo.BeerRepo;
//import org.junit.jupiter.api.*;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//class BeerServiceTest {
//
//    @Mock
//    private BeerRepo repoBeer;
//    @InjectMocks
//    private BeerService service;
//    static private List<Producer> producers;
//    static private List<Beer> beers;
//
//
//    @BeforeAll
//    static void setUp(){
//
//        producers = new ArrayList<>();
//        beers = new ArrayList<>();
//
//		Producer producer1 = new Producer("Klausen","Romania",1980,"Small producer in Romania",1);
//		Producer producer2 = new Producer("Ursus","Romania",1963,"Large producer in Romania",115);
//		Producer producer3 = new Producer("Heineken","Netherlands",1965,"Large producer in the Netherlands",200);
//		Producer producer4 = new Producer("Bucur","Romania",1964,"Large producer in Romania",150);
//
//        producers.add(producer1);
//        producers.add(producer2);
//        producers.add(producer3);
//        producers.add(producer4);
//
//
//        Beer beer1 = new Beer("Ursus Retro",producer2,"white",5,7, "can");
//		Beer beer2 = new Beer("Heineken Silver",producer3,"white",4,6, "bottle");
//		Beer beer3 = new Beer("Ursus Premium",producer2,"white",5,8, "bottle");
//		Beer beer4 = new Beer("Bucur Bruna",producer4,"black",3,10, "can");
//		Beer beer5 = new Beer("Indigen",producer1,"white",5,12, "bottle");
//
//        beers.add(beer1);
//        beers.add(beer2);
//        beers.add(beer3);
//        beers.add(beer4);
//        beers.add(beer5);
//    }
//
//    @Test
//    void filterReturnsListWithElemsHigherThanGivenValue() {
//        when(repoBeer.findAll()).thenReturn(beers);
//
//        service.setRepo(repoBeer);
//
//        List<Beer> list = new ArrayList<>();
//
//        Beer beer3 = new Beer("Ursus Premium",producers.get(1),"white",5,8, "bottle");
//        Beer beer4 = new Beer("Bucur Bruna",producers.get(3),"black",3,10, "can");
//        Beer beer5 = new Beer("Indigen",producers.get(0),"white",5,12, "bottle");
//
//        list.add(beer3);
//        list.add(beer4);
//        list.add(beer5);
//
//        List<Long> test = new ArrayList<>();
//
//        test.add(1l);
//        test.add(7l);
//
//        Assertions.assertEquals(service.filter(test).toString(),list.toString());
//    }
//
//    @Test
//    void getStatsByFoundingYearReturnsListOrderAfterYear() {
//        when(repoBeer.findAll()).thenReturn(beers);
//
//        service.setRepo(repoBeer);
//
//        List<BeerDTO> list = new ArrayList<>();
//        BeerDTO beer1 = new BeerDTO(1l, "Ursus Retro",producers.get(1).getFounding_year(),"white",5,7, "can", producers.get(1).getName(), producers.get(1).getNrOfBreweries(), userName);
//        BeerDTO beer2 = new BeerDTO(2l, "Heineken Silver",producers.get(2).getFounding_year(),"white",4,6, "bottle", producers.get(2).getName(), producers.get(2).getNrOfBreweries(), userName);
//        BeerDTO beer3 = new BeerDTO(3l, "Ursus Premium",producers.get(1).getFounding_year(),"white",5,8, "bottle", producers.get(1).getName(), producers.get(1).getNrOfBreweries(), userName);
//        BeerDTO beer4 = new BeerDTO(4l, "Bucur Bruna",producers.get(3).getFounding_year(),"black",3,10, "can", producers.get(3).getName(), producers.get(3).getNrOfBreweries(), userName);
//        BeerDTO beer5 = new BeerDTO(5l, "Indigen",producers.get(0).getFounding_year(),"white",5,12, "bottle", producers.get(0).getName(), producers.get(0).getNrOfBreweries(), userName);
//
//
////        2 4 3 1
//        list.add(beer1);
//        list.add(beer3);
//        list.add(beer4);
//        list.add(beer2);
//        list.add(beer5);
//
//        Assertions.assertEquals(service.getStatsByFoundingYear(1l).toString(),list.toString());
//    }
//
//    @Test
//    void getStatsByBreweryNrReturnsListOrderedAfterNrOfBreweries() {
//        when(repoBeer.findAll()).thenReturn(beers);
//
//        service.setRepo(repoBeer);
//
//        List<BeerDTO> list = new ArrayList<>();
//        BeerDTO beer1 = new BeerDTO(1l, "Ursus Retro",producers.get(1).getFounding_year(),"white",5,7, "can", producers.get(1).getName(), producers.get(1).getNrOfBreweries(), userName);
//        BeerDTO beer2 = new BeerDTO(2l, "Heineken Silver",producers.get(2).getFounding_year(),"white",4,6, "bottle", producers.get(2).getName(), producers.get(2).getNrOfBreweries(), userName);
//        BeerDTO beer3 = new BeerDTO(3l, "Ursus Premium",producers.get(1).getFounding_year(),"white",5,8, "bottle", producers.get(1).getName(), producers.get(1).getNrOfBreweries(), userName);
//        BeerDTO beer4 = new BeerDTO(4l, "Bucur Bruna",producers.get(3).getFounding_year(),"black",3,10, "can", producers.get(3).getName(), producers.get(3).getNrOfBreweries(), userName);
//        BeerDTO beer5 = new BeerDTO(5l, "Indigen",producers.get(0).getFounding_year(),"white",5,12, "bottle", producers.get(0).getName(), producers.get(0).getNrOfBreweries(), userName);
//
//
////        1 2 4 3
//        list.add(beer5);
//        list.add(beer1);
//        list.add(beer3);
//        list.add(beer4);
//        list.add(beer2);
//
//        Assertions.assertEquals(service.getStatsByBreweryNr(1l).toString(),list.toString());
//    }
//}