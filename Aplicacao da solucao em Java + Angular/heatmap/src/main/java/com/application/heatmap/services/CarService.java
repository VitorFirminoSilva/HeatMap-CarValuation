package com.application.heatmap.services;

import com.application.heatmap.entities.Car;
import com.application.heatmap.repositories.CarRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CarService {
    
    final CarRepository carRepository;
    
    public CarService(CarRepository carRepository){
        this.carRepository = carRepository;
    }
    
    
    public List<Car> findAll(){
        return carRepository.findAll();
    }
    
    public Optional<Car> findById(Long id){
        return carRepository.findById(id);
    }
    
    public boolean existsByModel(String model){
        return carRepository.existsByModel(model);
    }
    
    @Transactional
    public Car save(Car car){
        return carRepository.save(car);
    }
    
    @Transactional
    public void delete(Car car){
        carRepository.delete(car);
    }
            
            
            
            
            
            
            
            
            
            
    
    
    
}
