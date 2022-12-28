import React from 'react'
import SelectionTitle from "../SectionTitle/SectionTitle";
import "./Techs.css";

const Techs = () => {
  return (
    <section className='techs page__content' >
      <SelectionTitle dark='dark'>Технологии</SelectionTitle>
      <h3 className='techs__title'>7 технологий</h3>
      <h3 className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</h3>
      <ul className='techs__list page__list'>
        <li className='techs__list-item'>HTML</li>
        <li className='techs__list-item'>CSS</li>
        <li className='techs__list-item'>JS</li>
        <li className='techs__list-item'>React</li>
        <li className='techs__list-item'>Git</li>
        <li className='techs__list-item'>Express.js</li>
        <li className='techs__list-item'>mongoDB</li>
      </ul>
      </section>
  )
}

export default Techs