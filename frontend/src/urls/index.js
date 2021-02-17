const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const buildsIndex = `${DEFAULT_API_LOCALHOST}/builds`
export const roomsIndex = (buildId) =>
  `${DEFAULT_API_LOCALHOST}/builds/${buildId}/rooms`
export const PreReserve = `${DEFAULT_API_LOCALHOST}/pre_reserves`;
export const PreReserveReplace = `${DEFAULT_API_LOCALHOST}/pre_reserves/replace`;
export const reserves = `${DEFAULT_API_LOCALHOST}/reserves`;
