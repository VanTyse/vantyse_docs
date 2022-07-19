import React, {useState, useEffect} from 'react'


function useScrollDirection() {
    const [previousScrollOffset, setPreviousScrollOffset] = useState(getScrollOffset())
    const [currentScrollOffset, setCurrentScrollOffset] = useState(getScrollOffset())
    const [scrollDirection, setScrollDirection] = useState({direction: null})

    const scrollListener = () => {
        setCurrentScrollOffset(getScrollOffset())
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollListener)
    }, [])

    useEffect(() => {
        if (previousScrollOffset < currentScrollOffset){
            setScrollDirection({direction: 'down'})
        }
        else{
            setScrollDirection({direction: 'up'})
        }
        setPreviousScrollOffset(currentScrollOffset)
    }, [currentScrollOffset])

  return scrollDirection
}

const getScrollOffset = () => {
    return window.pageYOffset || document.documentElement.scrollOffset
}

export default useScrollDirection