import React, {FC} from 'react';
import classes from './Heading.module.scss';

type HeadingProps = {
    children: React.ReactNode;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    style?: React.CSSProperties;
    className?: string;
}
const Heading: FC<HeadingProps> = ({
                                       children,
                                       type = "h1",
                                       style,
                                       className
                                   }) => {
    const Tag = type;
    console.dir(children)
    return (
        <Tag className={[className, classes[type]].join(' ')} style={style}>
            {children}
        </Tag>
    );
};

export default Heading;
