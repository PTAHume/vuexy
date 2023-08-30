// ** Sanctum Service Import
import sanctumService from "./sanctumService"

// ** Export Service as useSanctum
export default function useSanctum(sanctumOverrideConfig) {
  const sanctum = new sanctumService(sanctumOverrideConfig)
   
  return {
    sanctum
  }
}
