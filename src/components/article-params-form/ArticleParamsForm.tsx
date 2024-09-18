import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	stateForm: (formState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ stateForm }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setselectArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setselectArticleState({ ...selectArticleState, [key]: value });
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => {
			setIsMenuOpen(true);
		},
		onChange: setIsMenuOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={setIsMenuOpen} isMenuOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						stateForm(selectArticleState);
					}}
					onReset={(e) => {
						e.preventDefault();
						stateForm(defaultArticleState);
					}}>
					<Text size={31} weight={800} uppercase as={'h2'}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => {
							handleChange('fontFamilyOption', option);
						}}></Select>

					<RadioGroup
						name='радио-кнопка'
						selected={selectArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => {
							handleChange('fontSizeOption', option);
						}}
						title='Размер шрифта'></RadioGroup>

					<Select
						title={'Цвет шрифта'}
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={(option) => {
							handleChange('fontColor', option);
						}}></Select>

					<Select
						title={'Цвет фона'}
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => {
							handleChange('backgroundColor', option);
						}}></Select>

					<Select
						title={'Ширина контента'}
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => {
							handleChange('contentWidth', option);
						}}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
