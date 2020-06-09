import { Component } from 'react';
import { Dimensions } from 'react-native';

export default class BaseListViewComponent extends Component {

    canLoadMore = true;
    isLoadingMore = false;
    listItems = [];
    dataSource = [];
    constructor(props) {
        super(props);
    }

    getListItems(offset) {

    }

    handleGetItemsDone = (list, startIndex) => {

        if (list.length == 0) {
            this.canLoadMore = false;
        } else {

            for (var i = 0; i < list.length; i++) {
                this.listItems.push(list[i]);
            }
            this.dataSource = this.listItems;
        }
    }

    // hiển thị lỗi nếu có vấn đề xảy ra 
    handleGetItemsError(error) {
        this.isLoadingMore = false;
        Alert.alert('Alert', 'Error ' + error.toString(), [{
            text: 'OK'
        }])
    }

    // lấy thêm dữ liệu
    loadMoreItems() {
        if (this.isLoadingMore) return;
        if (this.listItems.length == 0) return;
        this.isLoadingMore = true;
        this.getListItems(this.listItems.length);
    }

    onScroll(e) {
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset > height + 30) {
            this.loadMoreItems();
        }
    }
}





