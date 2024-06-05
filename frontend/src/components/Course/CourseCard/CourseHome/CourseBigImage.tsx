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
            <Image src={image} alt={title} width={2300} height={500}  />

        </div>
    );
    };

export default CourseBigImage;








