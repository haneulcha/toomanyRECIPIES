import React, { useState, useEffect, useRef } from 'react';
import { requestAll } from '../utils/request';

type ItemIdType = {
    id: number,
    kor: string,
    eng: string
}

function LandingPage() {
    const itemsList = useRef<ItemIdType[]>([])
    const [ searchInput, setSearchInput ] = useState<string>("")
    const [ filteredList, setFilteredList ] = useState<ItemIdType[]>([])

    function findMatches(value: string, items: ItemIdType[]){
        return items.filter(item => {
            const regex = new RegExp(value, 'gi')
            return item.kor.match(regex)
        })
    }

    function searchAhead (event: React.ChangeEvent<HTMLInputElement>){        
        const value = event.target.value;        
        setSearchInput(value)
        const newArr = findMatches(value, itemsList.current)
        setFilteredList(newArr)
    }


    useEffect( () => {
        async function init () {
            const allFurniture = await requestAll()
            for(const prop in allFurniture){
                if(allFurniture[prop][0].isDIY){
                itemsList.current.push({
                    id: allFurniture[prop][0][`internal-id`],
                    kor: allFurniture[prop][0].name?.[`name-KRko`],
                    eng: allFurniture[prop][0].name?.[`name-USen`]
                })}
            }        
        }
        init()        
    }, [])
  return (
    <main>
        <header>Welcome !</header>
        <input onChange={searchAhead} value={searchInput}></input>
        <section>
            <ul>
            {filteredList.map((item, i) => 
            <li key={i}>{item.kor}</li>
            )}
            </ul>
        </section>
    </main>
  );
}

export default LandingPage;
