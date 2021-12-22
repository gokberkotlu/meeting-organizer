<template>
    <b-modal id="modal-add-meeting" title="NEW MEETING">
        <p class="my-4">Insert New Meeting Information</p>

        <b-form @submit.prevent="addMeetingInformation()">
            <b-form-group id="input-group-meeting-subject-edit" label="Subject:" label-for="input-edit-meeting-subject-edit">
                <b-form-input id="input-edit-meeting-subject-edit" type="text" placeholder="Enter subject"
                v-model="newMeetingData.subject"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-meeting-date-edit" label="Date:"
                label-for="input-edit-meeting-date-edit">
                <b-form-datepicker id="input-edit-meeting-date-edit" type="date" placeholder="Enter date"
                v-model="newMeetingData.date" required>
                </b-form-datepicker>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../utils/serverUrl'
export default {
    data() {
        return {
            newMeetingData : {}
        }
    },
    methods: {
        addMeetingInformation() {
            axios({
                method: 'post',
                url: `${serverUrl}/add-meeting`,
                data: this.newMeetingData
            })
            .then(res => {
                if(res.status === 200) {
                    this.$emit('updated');
                    this.newMeetingData = {}
                }
            });
        }
    }
}
</script>