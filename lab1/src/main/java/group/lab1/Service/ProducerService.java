package group.lab1.Service;


import group.lab1.Model.Producer;
import group.lab1.Model.ProducerDTO;
import group.lab1.Model.SmallBeerDTO;
import group.lab1.Repo.ProducerRepo;
import jakarta.persistence.Tuple;
import org.springframework.data.util.Pair;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ProducerService implements Service<Producer> {

    private ProducerRepo repo;

    public ProducerService(ProducerRepo repo) {
        this.repo = repo;
    }

    @Override
    public List<Long> getAll(Long page) {
        return repo.findByPage(page).stream().map(producer -> producer.getId()).collect(Collectors.toList());
    }

    public List<ProducerDTO> getAllDTO(Long page) {
        return repo.findByPage(page).stream().map(ProducerDTO::toDTO).collect(Collectors.toList());
    }

    @Override
    public Producer save(Producer producer) {
        return repo.save(producer);
    }

    @Override
    public Producer getById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public Producer update(Producer producer) {
        return repo.save(producer);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<SmallBeerDTO> listProducerAutocomplete(String userInput){
        userInput = userInput.replace("\"","");
        return repo.getNameAndId(userInput).stream().map(producer->new SmallBeerDTO(producer.get(0,Long.class),producer.get(1, String.class))).collect(Collectors.toList());
    }
}
