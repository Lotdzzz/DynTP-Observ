import {reactive, ref} from "vue";
import type {SysAuthLogVO} from "../../types/vo/monitor/SysAuthLogVO.ts";

// Store data used by the authentication log page.
const authLogDataList = ref<SysAuthLogVO[]>([]);
const selectedAuthLogs = ref<SysAuthLogVO[]>([]);
const total = ref(0);
const queryForm = reactive({
    username: "", loginType: "", status: undefined as number | undefined, ipAddress: "", ipLocation: "",
    beginTime: "", endTime: "", pageNum: 1, pageSize: 10,
});
const defaultQueryForm = {...queryForm};

export {authLogDataList, defaultQueryForm, queryForm, selectedAuthLogs, total};
