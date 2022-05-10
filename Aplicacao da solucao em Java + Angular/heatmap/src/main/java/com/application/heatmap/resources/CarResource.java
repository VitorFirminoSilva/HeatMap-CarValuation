package com.application.heatmap.resources;

import com.application.heatmap.entities.Car;
import com.application.heatmap.repositories.CarRepository;
import java.util.List;
import java.util.NoSuchElementException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
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
@CrossOrigin(origins = "http://localhost:8100")
@RequestMapping("/cars")
public class CarResource {
    
    @Autowired
    private CarRepository carRepository;
    
    @GetMapping
    public ResponseEntity<List<Car>> findAll() {
        List<Car> cars = carRepository.findAll();
        return ResponseEntity.ok().body(cars);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> findById(@PathVariable Long id) {
        try{
            Car car = carRepository.findById(id).get();
            return ResponseEntity.status(201).body(car);
        }catch(NoSuchElementException err){
            return ResponseEntity.status(404).body(new Car());
        } 
    }
    
    @PostMapping
    public ResponseEntity<String> create(@RequestBody Car car){
        try{
            carRepository.save(car);
            return ResponseEntity.ok().body("Success in create car");
        }catch(Exception ex){
 
            if(ex instanceof ConstraintViolationException){
                return ResponseEntity.status(401).body("Erro in create car - name duplicate"); 
            }
            
            return ResponseEntity.status(500).body("Erro - unhandled error (" + ex.getMessage() + ")"); 
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Car> edit(@RequestBody Car newCar, @PathVariable Long id){
        
        return ResponseEntity.ok().body(
                carRepository.findById(id)
                    .map(car -> {
                        car.setBrand(newCar.getBrand());
                        car.setModel(newCar.getModel());
                        car.setFabricationYear(newCar.getFabricationYear());
                        car.setEngineLiters(newCar.getEngineLiters());
                        car.setFuel(newCar.getFuel());
                        car.setValuations(newCar.getValuations());

                        return carRepository.save(car);
                    })
                    .orElseGet(() -> {
                      return carRepository.save(newCar);
                    })
        );
  
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        
        if(carRepository.existsById(id)){
           Car car = carRepository.findById(id).get();
           carRepository.delete(car);
           return ResponseEntity.status(201).body("Success Delete"); 
        }else{
            return ResponseEntity.status(404).body("ERR): Car for ID = " + id + "not found");
        }
    }
}
