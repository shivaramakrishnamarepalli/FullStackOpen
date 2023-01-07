import Note from './Note';

const Filter = ({ filter, persons }) => {
    return filter.length === 0
      ? persons.map((per, i) => (
          <Note key={i} name={per.name} num={per.number} />
        ))
      : filter.map((per, i) => (
          <Note key={i} name={per.name} num={per.number} />
        ));
};

export default Filter;