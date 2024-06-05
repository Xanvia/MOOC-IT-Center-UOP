import React from "react";
import Image from "next/image";

interface CourseImageProps {
    title: string;
    description: string;
    image: string;
}

const CourseBigImage: React.FC<CourseImageProps> = ({
    title,
    image,
}) => {
    return (
        <div>
            <Image src={image} alt={title} width={1200} height={200} />

        </div>
    );
    };

export default CourseBigImage;








