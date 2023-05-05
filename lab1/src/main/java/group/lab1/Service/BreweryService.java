package group.lab1.Service;

import group.lab1.Model.Brewery;
import group.lab1.Model.BreweryDTO;
import group.lab1.Repo.BreweryRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class BreweryService implements Service<Brewery>{
    private BreweryRepo repo;

    public BreweryService(BreweryRepo repo) {
        this.repo = repo;
    }

    @Override
    public List<Long> getAll(Long page) {
        return repo.findByPage(page).stream().map(brewery -> brewery.getId()).collect(Collectors.toList());
    }

    public List<BreweryDTO> getAllDTO(Long page){
        return repo.findByPage(page).stream().map(brewery -> BreweryDTO.toDTO(brewery, repo.findNrOfBeers(brewery.getId()))).collect(Collectors.toList());
    }

    @Override
    public Brewery save(Brewery brewery) {
        return repo.save(brewery);
    }

    @Override
    public Brewery getById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public Brewery update(Brewery brewery) {
        return repo.save(brewery);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
