import { Card } from 'antd';
import { useState } from 'react';


const handleClick = (num: number) => {
    window.open(`/anime/?number=${num}`, '_blank');
}


export default function AnimeCard(elem: IAnime) {
    const [isHovered, setIsHovered] = useState(true);

    const handleMouseEnter = () => {
        setIsHovered(false)
    };

    const handleMouseLeave = () => {
        setIsHovered(true)
    };

    return (
            <Card
                hoverable
                style={{
                    width: 350,
                    height: isHovered ? 150 : 600,
                    transition: 'height 1s ease',
                    margin:2
                }}
                title={elem.title}
                extra={elem.score}
                onClick={() => handleClick(elem.mal_id)}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                cover={<img alt="example" src={elem.images.jpg.large_image_url} height={480} width={350}/>}
            >{elem.rating}
            </Card>
    )
}