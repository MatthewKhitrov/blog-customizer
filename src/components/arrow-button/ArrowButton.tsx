import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = ({ onClick, isMenuOpen }: any) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={() => onClick(!isMenuOpen)}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isMenuOpen && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isMenuOpen && styles.arrow_open)}
			/>
		</div>
	);
};
