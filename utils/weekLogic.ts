import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/ko';

dayjs.extend(isoWeek);
dayjs.locale('ko');

// 현재 주차 계산 로직

// 해당 월의 전체 주차 계산 로직