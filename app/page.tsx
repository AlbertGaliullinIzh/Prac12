'use client'

import React, { useState, useEffect } from "react";
import PanelAnime from "./components/panelWithAnime/panelWithAnime";
import { Select, Radio, Pagination, Button } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';


const sorts: { [key: string]: string } = {
  "Без сортировки": "default",
  "Популярность": "popularity",
  "Оценка": "score",
  "Количество оценок": "members",
  "Количество favorits": "favorites",
  "Количество эпизодов": "episodes",
  "Сортировка по датам": "start_date"
}
const filters_types: { [key: string]: string } = {
  "Любой тип": "default",
  "Телевизионные": "tv",
  "Кинемотограф": "movie",
  "Оригинальная видео-анимация": "ova",
  "Доп контент": "special",
  "Оригинальная сетевая анимация": "ona",
  "Музыкальные": "music",
  "Коммерческие": "cm",
  "Рекламные": "pv",
  "Телевизионные доп контент": "tv_special"
}

const filters_ratings: { [key: string]: string } = {
  "Любой возраст": "default",
  "Все возраста": "g",
  "Детское": "pg",
  "13+": "pg13",
  "17+": "r17",
  "Взрослое (R)": "r",
  "Хентай": "rx"
}

const filters_statuses: { [key: string]: string } = {
  "Любой статус": "default",
  "В эфире": "airing",
  "Завершен": "complete",
  "Скоро выходит": "upcoming"
}

const handleClick = () => {
  window.open(`/watchLater`);
}


export default function Home() {

  const [sort, setSort] = useState<string>(sorts["Без сортировки"])
  const [filters_type, setFilters_type] = useState<string>(filters_types["Любой тип"])
  const [filters_rating, setFilters_rating] = useState<string>(filters_ratings["Любой возраст"])
  const [filters_status, setFilters_status] = useState<string>(filters_statuses["Любой статус"])
  const [search_query_sort, setSearch_query_sort] = useState<string>("asc")
  const [numberPage, setNumberPage] = useState<number>(1)

  const handleChangeSort = (value: string) => {
    setSort(value);
  };
  const handleChangeFilters_types = (value: string) => {
    setFilters_type(value);

  };
  const handleChangeFilters_ratings = (value: string) => {
    setFilters_rating(value);
  };
  const handleChangeFilters_statuses = (value: string) => {
    setFilters_status(value);
  };
  const handleChangeSearch_query_sort = (e: RadioChangeEvent) => {
    setSearch_query_sort(e.target.value);
  };

  function check() {
    if (sort == undefined || filters_type == undefined || filters_rating == undefined || filters_status == undefined) {
      return false
    }
    return true
  }


  return (
    <div>
      <Select
        id="sort"
        style={{ width: 200 }}
        onChange={handleChangeSort}
        value={sort}
        options={
          Object.keys(sorts).map(
            s => (
              { value: sorts[s], label: s }
            )
          )
        }
      />
      <Radio.Group onChange={handleChangeSearch_query_sort} defaultValue={"desc"} buttonStyle="solid">
        <Radio.Button value={"asc"}>По возрастанию</Radio.Button>
        <Radio.Button value={"desc"}>По убыванию</Radio.Button>
      </Radio.Group>

      <Select
        id="filter_types"
        style={{ width: 200 }}
        onChange={handleChangeFilters_types}
        value={filters_type}
        options={
          Object.keys(filters_types).map(
            s => (
              { value: filters_types[s], label: s }
            )
          )
        }
      />
      <Select
        id="filter_rating"
        style={{ width: 200 }}
        onChange={handleChangeFilters_ratings}
        value={filters_rating}
        options={
          Object.keys(filters_ratings).map(
            s => (
              { value: filters_ratings[s], label: s }
            )
          )
        }
      />
      <Select
        id="filter_status"
        style={{ width: 200 }}
        onChange={handleChangeFilters_statuses}
        value={filters_status}
        options={
          Object.keys(filters_statuses).map(
            s => (
              { value: filters_statuses[s], label: s }
            )
          )
        }
      />
      <Button onClick={handleClick}>Смотреть позже</Button>
      {check() ?
        <PanelAnime {...{ filters: { type: filters_type, rating: filters_rating, status: filters_status, search_query_sort: search_query_sort }, sort: sort, numberPage: numberPage, setNumberPage: setNumberPage }} />
        :
        <></>
      }
    </div>
  );
}
