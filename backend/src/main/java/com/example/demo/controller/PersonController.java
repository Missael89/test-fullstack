package com.example.demo.controller;

import java.util.List;

import java.util.Optional;

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

import com.example.demo.model.Person;
import com.example.demo.service.PersonService;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "*")
public class PersonController {

    @Autowired
    private PersonService personService;


    @GetMapping
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Integer id) {
        Optional<Person> person = personService.getPersonById(id);
        return person.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Person createPerson(@RequestBody Person person) {
        return personService.savePerson(person);
    }

   @PutMapping("/{id}")
   public ResponseEntity<Person> updatePerson(@PathVariable Integer id, @RequestBody Person personIn) {
       return personService.getPersonById(id)
               .map(person -> {
                   person.setNombre(personIn.getNombre());
                   person.setApellido(personIn.getApellido());
                   person.setFecha_nacimiento(personIn.getFecha_nacimiento());
                   person.setPuesto(personIn.getPuesto());
                   person.setSueldo(personIn.getSueldo());
                   return ResponseEntity.ok(personService.savePerson(person));
               }).orElseGet(() -> ResponseEntity.notFound().build());
   }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Integer id) {
        if (personService.getPersonById(id).isPresent()) {
            personService.deletePerson(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
