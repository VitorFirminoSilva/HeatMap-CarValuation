package com.application.heatmap.controllers;

import com.application.heatmap.dtos.CarDTO;
import com.application.heatmap.entities.Car;
import com.application.heatmap.services.CarService;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/cars")
public class CarController {
    
    final CarService carService;
    
    public CarController(CarService carService){
        this.carService = carService;
    }
    
    
    @GetMapping
    public ResponseEntity<List<Car>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(carService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable(value="id") Long id) {
        Optional<Car> carOptional = carService.findById(id);
        if(!carOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car not found");
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(carOptional.get());
    }
    
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid CarDTO carDTO){
        if(carService.existsByModel(carDTO.getModel())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Car Model is already in use!");
        }
        
        var carModel = new Car();
        BeanUtils.copyProperties(carDTO, carModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(carService.save(carModel));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> edit(@PathVariable(value="id") Long id, 
                                       @RequestBody @Valid CarDTO carDTO){
        Optional<Car> carOptional = carService.findById(id);
        if(!carOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car not found");
        }

        var updCar = new Car();
        BeanUtils.copyProperties(carDTO, updCar);
        updCar.setId(carOptional.get().getId());
        if(!updCar.getValuations().isEmpty())
            updCar.setValuations(carOptional.get().getValuations());
        return ResponseEntity.status(HttpStatus.OK).body(carService.save(updCar));
  
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value="id") Long id){
        Optional<Car> carOptional = carService.findById(id);
        if(!carOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car not found");
        }
        carService.delete(carOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Car deleted succesfully.");
    }
}
