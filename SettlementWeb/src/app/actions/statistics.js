import { action } from '../utils/common'

export const QUERY_STATISTICS = Symbol()
export const BEGIN_QUERY_STATISTICS = Symbol()
export const END_QUERY_STATISTICS = Symbol()
export const ERROR_QUERY_STATISTICS = Symbol()

export const queryStats = (request) => action(QUERY_STATISTICS, { request })
export const beginQueryStatistics = () => action(BEGIN_QUERY_STATISTICS)
export const endQueryStatistics = (result) => action(END_QUERY_STATISTICS, { result })
export const errorQueryStatistics = () => action(ERROR_QUERY_STATISTICS)