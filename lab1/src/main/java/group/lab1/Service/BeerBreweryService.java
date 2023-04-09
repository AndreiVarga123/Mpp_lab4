package group.lab1.Service;

import group.lab1.Model.BeerBrewery;
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
        List<Long> ids = new ArrayList<>();

        for(long i=page;i<=page+99;i++){
            ids.add(repo.findById(i).get().getId());
        }

        return ids;
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
}
