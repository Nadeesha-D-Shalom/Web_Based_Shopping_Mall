package com.app.Web_Based_Shopping_Mall.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID> {
    default List<T> findAllSorted(String field){
        return findAll(Sort.by(Sort.Direction.ASC, field));
    }
    default List<T> findPage(int page, int size){
        return findAll(PageRequest.of(page, size)).getContent();
    }
}
