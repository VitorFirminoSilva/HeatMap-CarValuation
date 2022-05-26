package com.application.heatmap.controllers;

import com.application.heatmap.dtos.ValuationDTO;
import com.application.heatmap.entities.Valuation;
import com.application.heatmap.repositories.CarRepository;
import com.application.heatmap.repositories.ValuationRepository;
import com.application.heatmap.services.CarService;
import com.application.heatmap.services.ValuationService;
import com.application.heatmap.util.InvalidRangeDate;
import java.util.Calendar;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/valuations")
public class ValuationController {
    
    final ValuationService valuationService;
    final CarService carService;

    public ValuationController(ValuationService valuationService, CarService carService) {
        this.valuationService = valuationService;
        this.carService = carService;
    }
    
    @GetMapping
    public ResponseEntity<List<Valuation>> findAll() {   
        return ResponseEntity.status(HttpStatus.OK).body(valuationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable(value="id") Long id) {
        Optional<Valuation> valuationOptional = valuationService.findbyId(id);
        if(!valuationOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Valuation not found!");
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(valuationOptional.get()); 
    }
 
    @PostMapping()
    public ResponseEntity<Object> create(@RequestBody @Valid ValuationDTO valuationDTO){
     
        var updValuation = new Valuation();
        BeanUtils.copyProperties(valuationDTO, updValuation);
        
        return ResponseEntity.status(HttpStatus.OK).body(valuationService.save(updValuation));
        
        /*Calendar cal = Calendar.getInstance();
        int tempYear;
        int bdYear;
        try{
            if(carRepository.existsById(valuation.getCar().getId())){
                List<Valuation> temp = carRepository.findById(valuation.getCar().getId()).get().getValuations();
            
                cal.setTime(valuation.getDateValuation());
                tempYear = cal.get(Calendar.YEAR);

                bdYear = valuation.findGreaterYear(temp);
                
                System.out.println(tempYear + " >= " + bdYear);
              
                if(bdYear <= tempYear){
                    valuationRepository.save(valuation);
                    return ResponseEntity.ok().body("Success in create valuation"); 
                }else{
                    throw new InvalidRangeDate("Your Date must be greater than " + bdYear);
                }
            }else{
               throw new Exception();
            }
        }catch(Exception ex){
            if(ex instanceof InvalidRangeDate){
                return ResponseEntity.status(401).body("Erro in create valuation - " + ex.getMessage()); 
            }

         
            return ResponseEntity.status(500).body("Erro - unhandled error (" + ex.getMessage() + ")"); 
        }*/
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> edit(@PathVariable(value="id") Long id, @RequestBody @Valid ValuationDTO valuationDTO){
        
        Optional<Valuation> valuationOptional = valuationService.findbyId(id);
        if(!valuationOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Valuation not found!");
        }
        
        var updValuation = new Valuation();
        BeanUtils.copyProperties(valuationDTO, updValuation);
        
        updValuation.setId(valuationOptional.get().getId());
        updValuation.setCar(valuationOptional.get().getCar());
        
        return ResponseEntity.status(HttpStatus.OK).body(valuationService.save(updValuation));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value="id") Long id){
        Optional<Valuation> valuationOptional = valuationService.findbyId(id);
        if(!valuationOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Valuation not found!");
        }
        
        valuationService.delete(valuationOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Valuation deleted succesfully.");
        
    }
}
