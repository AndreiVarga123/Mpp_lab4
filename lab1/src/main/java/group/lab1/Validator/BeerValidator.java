package group.lab1.Validator;

import group.lab1.Model.Beer;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import org.springframework.web.server.ServerWebInputException;

import java.util.stream.Collectors;


public class BeerValidator implements Validator {

    public BeerValidator() {
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return Beer.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ValidationUtils.rejectIfEmpty(errors,"name","name.required");

        Beer beer = (Beer) target;
        if(beer.getAlcoholLvl()<0)
            errors.rejectValue("alcoholLvl","alcoholLvl.negative");
        if(beer.getPrice()<0)
            errors.rejectValue("price","price.negative");
        if(errors.hasErrors())
            throw new ServerWebInputException(errors.getAllErrors().stream().map(e->e.getCode()).collect(Collectors.toList()).toString());
    }
}
