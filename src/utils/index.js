import {parse} from 'query-string';

/** Лимит единиц контента для пагинации.*/
export const limit = 10;

/** Возвращает объект {currentPage, offset}, 
 * рассчитывая их из переданного параметра search
 * @param search - строка вида "?page=1" (get-параметр)
 */
export const getPagination = search => {
	const parsedSearch = parse(search);
	const currentPage = parsedSearch.page ? parsedSearch.page : 1;
	const offset = currentPage * limit - limit;
	return {currentPage, offset}
};

