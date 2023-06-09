package group.lab1.Service;

import group.lab1.Model.BeerBrewery;
import group.lab1.Model.BeerBreweryDTO;
import group.lab1.Repo.BeerBreweryRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class BeerBreweryService implements Service<BeerBrewery> {
    private BeerBreweryRepo repo;

    public BeerBreweryService(BeerBreweryRepo repo) {
        this.repo = repo;
    }

    @Override
    public List<Long> getAll(Long page) {
        return repo.findByPage(page).stream().map(beerBrewery -> beerBrewery.getId()).collect(Collectors.toList());
    }

    @Override
    public BeerBrewery save(BeerBrewery obj) {
        return repo.save(obj);
    }

    @Override
    public BeerBrewery getById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public BeerBrewery update(BeerBrewery obj) {
        return repo.save(obj);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<BeerBreweryDTO> getAllDTO(Long page){
        return repo.findByPage(page).stream().map(BeerBreweryDTO::toDTO).collect(Collectors.toList());
    }
}
