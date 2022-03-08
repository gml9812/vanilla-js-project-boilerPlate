const API_END_POINT = '';

const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId}`);

    if (!res.ok) {
      throw new Error('서버의 상태가 이상합니다');
    }

    return await res.json();
  } catch (e) {
    throw new Error(`에러가 발생했습니다! ${e.message}`);
  }
};

export default request;
