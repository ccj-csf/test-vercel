import { IFetchDataListResult } from '@/types';
import { useCallback, useState } from 'react';

/**
 * 使用无限滚动的自定义hook。
 *
 * @param fetchDataFunction 一个用于获取数据的函数，接受一个参数对象，返回一个Promise，Promise解析为IFetchCharacterDataListResult类型。
 * @param initialParams 初始的请求参数，默认为空对象。
 * @param defaultPageParamName 默认的分页参数字段名，默认为'page'。
 * @returns 返回一个对象，包含列表数据、是否还有更多数据、加载更多数据的函数和重置并获取数据的函数。
 */
export const useInfiniteScroll = <T>(
  fetchDataFunction: (params: Record<string, any>) => Promise<IFetchDataListResult<T>>,
  initialParams = {},
  defaultPageParamName = 'page', // 默认分页参数的字段名
) => {
  // 状态钩子，用于存储列表数据。
  const [list, setList] = useState<T[]>([]);
  // 状态钩子，用于指示是否还有更多数据可以加载。
  const [hasMore, setHasMore] = useState(true);
  // 状态钩子，用于存储当前的页码。
  const [page, setPage] = useState(1);
  // 状态钩子，用于存储当前的请求参数。
  const [params, setParams] = useState(initialParams);
  // 状态钩子，用于存储当前使用的分页参数名。
  const [pageParamName, setPageParamName] = useState(defaultPageParamName); // 存储当前使用的分页参数名

  // 使用useCallback钩子优化loadMore函数，避免不必要的重新渲染。
  const loadMore = useCallback(
    async (currentPage = page, currentParams = params, currentPageParamName = pageParamName) => {
      console.log('🚀 ~ currentPage:', currentPage);
      // console.log('currentPageParamName :>> ', currentPageParamName);
      // 现在使用currentPageParamName来动态设置分页参数的字段名
      const newParams = { ...currentParams, [currentPageParamName]: currentPage };
      try {
        const { items, has_more } = await fetchDataFunction(newParams);
        setHasMore(!!has_more);
        setList((prevList) => [...prevList, ...items]);
        setPage(currentPage + 1);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [fetchDataFunction, params, page, pageParamName],
  );

  // 使用useCallback钩子优化resetAndFetch函数，避免不必要的重新渲染。
  const resetAndFetch = useCallback(
    (resetParams = {}, newPageParamName = defaultPageParamName) => {
      // 允许在重置和获取数据时指定新的分页参数名
      setPageParamName(newPageParamName); // 更新当前使用的分页参数名
      setParams({ ...initialParams, ...resetParams });
      setList([]);
      setHasMore(true);
      setPage(1);
      return loadMore(1, { ...initialParams, ...resetParams }, newPageParamName);
    },
    [loadMore, initialParams, defaultPageParamName],
  );

  const refreshData = useCallback(async () => {
    try {
      const newParams = { ...params, [pageParamName]: 1 };
      const response = await fetchDataFunction(newParams);

      const { items, has_more } = response;
      setHasMore(!!has_more);
      // 更新列表数据而不先清空
      setList(items);
      setPage(2); // 重置为第二页，假设每次刷新都重新从第一页开始加载
    } catch (error) {
      console.error(error);
    }
  }, [fetchDataFunction, params, pageParamName]);

  return { list, hasMore, loadMore: () => loadMore(), resetAndFetch, refreshData };
};
